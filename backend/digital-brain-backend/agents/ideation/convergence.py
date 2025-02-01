from setup import get_openai_client
from textwrap import dedent


def convergence_thinking(user_input: str) -> str:
    client = get_openai_client()
    prompt = dedent(
        """
        Context: You are entering the Convergence Thinking Phase of a multi-step ideation system based on the Catalyst Creativity framework.
        Your goal in this phase is to refine, evaluate, and synthesize the wide range of ideas generated earlier, selecting and elaborating
        on those that offer the greatest novelty, value, and potential. You will integrate the principles of Catalyst Creativity to produce a coherent,
        well-structured set of refined ideas or solutions.

        Instructions:

        1. **Embrace Novelty and Value**:
            Evaluate each idea from the divergence phase for its potential to be both new and useful.
            Prioritize concepts that balance originality with practical applicability.
        2. **Iterative Convergence**:
            Critically assess the ideas provided, grouping similar concepts together and identifying common themes.
            Select and refine those ideas that show the most promise, while noting potential enhancements.
        3. **Structured Chain-of-Thought Guidance**:
            Use a clear, step-by-step process to explain how ideas are being refined or merged.
            Document your reasoning and the criteria used to evaluate each idea (e.g., feasibility, impact, uniqueness).
        4. **Emotional and Narrative Anchoring**:
            Where applicable, bring in storytelling or personal insights to reinforce why certain ideas might resonate emotionally and intellectually.
            Consider how the refined ideas can be communicated in a compelling and relatable way.
        5. **Balancing Constraints with Freedom**:
            Factor in any constraints or challenges that were inherent in the original brainstorming, using them to guide the refinement process.
            Ensure that while ideas are being critically evaluated, the process still leaves room for creative flexibility.
        6. **Growth Mindset and Iterative Feedback**:
            Be open to re-evaluating ideas and incorporating feedback from the divergence phase.
            Identify potential risks or shortcomings in the refined ideas and suggest adjustments or alternatives.

        Task:
            Given the list of ideas generated during the divergence phase, synthesize, evaluate, and refine these ideas into a coherent and focused set of proposals.
            Your response should explain your reasoning clearly and include a structured overview (e.g., grouped bullet points or numbered steps) of the selected ideas,
            why they were chosen, and how they might be further developed.
        """
    )

    response = client.chat.completions.create(
        model="o3-mini",
        messages=[
            {
                "role": "developer",
                "content": prompt,
            },
            {"role": "user", "content": f"User input: {user_input}"},
        ]
    )

    print("Convergence response: ", response.choices[0].message.content)

    return response.choices[0].message.content.strip()
