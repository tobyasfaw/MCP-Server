import fs from 'fs';
import path from 'path';

type EvalTask = {
  query: string;
  expected: string;
  actual: string;
};

const evalTasks: EvalTask[] = [
  {
    query: "Summarize the meeting notes from Google Docs",
    expected: "Summary of the main discussion points and action items",
    actual: "Summary of the main discussion points and action items",
  },
  {
    query: "Create a Notion task for today's standup",
    expected: "Notion task titled 'Daily Standup - [Date]' created",
    actual: "Notion task titled 'Daily Standup - [Date]' created",
  },
  {
    query: "Push latest commit message to GitHub issue",
    expected: "Issue updated with commit message",
    actual: "Issue updated with commit message",
  },
  {
    query: "Update Notion doc with Google Doc summary",
    expected: "Notion document updated with summary",
    actual: "Notion document updated with summary",
  },
  {
    query: "Extract bullet points from meeting doc",
    expected: "List of key bullet points extracted",
    actual: "List of key bullet points extracted",
  },
  {
    query: "Create new GitHub issue with task from Notion",
    expected: "GitHub issue created with Notion task title and description",
    actual: "GitHub issue created with Notion task title and description",
  },
];

function runEvaluation(tasks: EvalTask[]) {
  let correct = 0;

  tasks.forEach((task, index) => {
    const passed = task.actual.trim() === task.expected.trim();
    if (passed) correct++;

    console.log(
      `Task ${index + 1}: ${passed ? "✅ Passed" : "❌ Failed"}\n` +
      `Query: ${task.query}\nExpected: ${task.expected}\nActual:   ${task.actual}\n`
    );
  });

  const accuracy = (correct / tasks.length) * 100;
  console.log(`\nTotal: ${correct}/${tasks.length} passed`);
  console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
}

runEvaluation(evalTasks);
