import type { SessionData, Section, Exercise, DayGroup } from '../types';

// Raw import of all session files using Vite's glob import from project root
const sessionModules = import.meta.glob('../sessions/SESSION-*.md', {
  query: '?raw',
  eager: true
}) as Record<string, any>;

export function parseSessionMarkdown(rawText: string, sessionNum: number): SessionData {
  const safeText = rawText || '';
  const id = sessionNum < 10 ? `0${sessionNum}` : `${sessionNum}`;
  const day: DayGroup = sessionNum <= 6 ? 1 : 2;

  // Extract Title (first # heading)
  const titleMatch = safeText.match(/^#\s+(.*)$/m);
  const title = titleMatch ? titleMatch[1].trim() : `Session ${id}`;

  // Extract Objective
  const objMatch = safeText.match(/##\s+(?:🎯\s*)?Objective\n([\s\S]*?)(?=\n##|$)/i);
  const objective = objMatch ? objMatch[1].trim() : '';

  // Extract Topics (In Scope or Curriculum Breakdown)
  const topicsMatch = safeText.match(/##\s+(?:📋\s*)?(?:In Scope|Topics|Curriculum Breakdown)[^\n]*\n([\s\S]*?)(?=\n##|$)/i);
  const topicsRaw = topicsMatch ? topicsMatch[1].trim() : '';
  const topics = topicsRaw
    .split('\n')
    .filter(line => line.trim().startsWith('*') || line.trim().startsWith('-'))
    .map(line => line.replace(/^[\*\-]\s*/, '').replace(/\*\*/g, '').trim());

  // Extract Mental Model
  const mentalMatch = safeText.match(/##\s+(?:🧠\s*)?Mental Model\n([\s\S]*?)(?=\n##|$)/i);
  const mentalModel = mentalMatch ? mentalMatch[1].trim() : undefined;

  // Extract Exit Target
  const exitMatch = safeText.match(/##\s+(?:🎯\s*)?Exit Target\n([\s\S]*?)(?=\n##|$)/i);
  const exitTargetText = exitMatch ? exitMatch[1].trim() : 'Satisfy exit target requirements.';

  // Extract Sections by ## top headings (except system headers) or ### subheadings
  const sections: Section[] = [];
  const sectionBlocks = safeText.split(/(?=\n##?\s+)/);

  sectionBlocks.forEach((block, idx) => {
    const headerMatch = block.match(/^\n?##?\s+(.*)\n/);
    if (headerMatch) {
      const headerTitle = headerMatch[1].trim();

      // Only skip main Objective from section tabs (shown in header banner)
      const isObjective = ['Objective', '🎯 Objective'].some(sh => headerTitle.toLowerCase() === sh.toLowerCase());

      if (!isObjective && !headerTitle.toLowerCase().includes('exercise')) {
        sections.push({
          id: `sec-${sessionNum}-${idx}`,
          title: headerTitle,
          content: block.trim()
        });
      }
    }
  });

  // Fallback section if no custom sections parsed
  if (sections.length === 0) {
    sections.push({
      id: `sec-${sessionNum}-main`,
      title: 'Session Curriculum',
      content: safeText.replace(/^#\s+.*\n/, '').trim()
    });
  }

  // Extract Exercises
  const exercises: Exercise[] = [];
  const exerciseBlocks = safeText.split(/(?=\n###?\s+(?:Exercise|What YOU Will Do|AI Interaction)\s*)/i);

  let explainBackPrompt: string | undefined = undefined;

  exerciseBlocks.forEach((exBlock, idx) => {
    const exHeaderMatch = exBlock.match(/^\n?###?\s+((?:Exercise|What YOU Will Do|AI Interaction|Explain Back)[\s\S]*?)\n/i);
    if (exHeaderMatch) {
      const exTitle = exHeaderMatch[1].trim();
      const exPrompt = exBlock.replace(/^\n?###?\s+.*\n/i, '').trim();

      const isExplainBack = exTitle.toLowerCase().includes('explain back');
      const isAiAudit = exTitle.toLowerCase().includes('ai') || exTitle.toLowerCase().includes('attack') || exTitle.toLowerCase().includes('audit');

      if (isExplainBack) {
        explainBackPrompt = exPrompt;
      }

      exercises.push({
        id: `ex-${sessionNum}-${idx}`,
        title: exTitle,
        type: isExplainBack ? 'explain_back' : isAiAudit ? 'ai_audit' : 'practical',
        prompt: exPrompt
      });
    }
  });

  return {
    id,
    number: sessionNum,
    title,
    day,
    rawContent: safeText,
    objective,
    topics,
    mentalModel,
    sections,
    exercises,
    explainBackPrompt,
    exitTargetText
  };
}

export function loadAllSessions(): SessionData[] {
  const sessions: SessionData[] = [];
  const globKeys = Object.keys(sessionModules);

  try {
    for (let i = 1; i <= 17; i++) {
      const numStr = i < 10 ? `0${i}` : `${i}`;
      const searchPattern = `SESSION-${numStr}.md`;

      const matchedKey = globKeys.find(k => k.includes(searchPattern));
      const mod = matchedKey ? sessionModules[matchedKey] : null;

      const rawText = typeof mod === 'string'
        ? mod
        : (mod && typeof mod.default === 'string' ? mod.default : '');

      if (rawText) {
        sessions.push(parseSessionMarkdown(rawText, i));
      } else {
        sessions.push({
          id: numStr,
          number: i,
          title: `Session ${numStr}`,
          day: i <= 6 ? 1 : 2,
          rawContent: `Session ${numStr} Content`,
          objective: `Objective for Session ${numStr}`,
          topics: [],
          sections: [{ id: `sec-${i}-fallback`, title: 'Overview', content: `Session ${numStr} Content` }],
          exercises: [],
          exitTargetText: `Exit target for Session ${numStr}`
        });
      }
    }
  } catch (e) {
    console.error('Error loading sessions in loadAllSessions:', e);
  }

  return sessions.sort((a, b) => a.number - b.number);
}
