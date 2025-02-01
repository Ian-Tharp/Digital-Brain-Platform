from textwrap import dedent
from setup import get_openai_client
from langchain import hub


def divergence_thinking(user_input: str) -> str:
    client = get_openai_client()
    # prompt = hub.pull("divergence-thinking")
    prompt = dedent(
        """
        Context: You are entering the Divergence Thinking Phase of a multi-step ideation system based on the Catalyst Creativity framework.
        Your goal in this phase is to generate a wide range of novel, creative, and valuable ideas in response to the user's query.
        There is no need to filter or judge ideas at this stage; instead, focus on expansive brainstorming.

        Instructions:

        1. **Embrace Novelty and Value:**
            - Generate ideas that are both new and useful.
            - Think broadly and consider unconventional angles.
        2. **Iterative Divergence:**
            - Brainstorm a diverse range of ideas without worrying about immediate practicality.
            - Do not restrict your thinking by focusing on feasibility—every idea is valuable at this stage.
        3. **Structured Chain-of-Thought Guidance:**
            - Provide clear, step-by-step reasoning behind each idea.
            - Organize your thoughts in a structured format (e.g., bullet points, numbered lists) to maintain clarity.
        4. **Emotional and Narrative Anchoring:**
            - Where applicable, include personal insights or storytelling elements to bring the ideas to life.
            - Use descriptive language to help paint a vivid picture for each idea.
        5. **Balancing Constraints with Freedom:**
            - While you are free to explore expansive ideas, consider any inherent constraints as creative challenges.
            - Look for opportunities where limitations might inspire unique solutions.
        6. **Growth Mindset:**
            - Embrace risks and explore ideas even if they seem outlandish initially.
            - Consider each idea a starting point that can be refined later.

        Task:
            Given the user's query, generate a diverse and expansive set of ideas that align with the principles above.
            Ensure that your response includes a wide array of concepts, approaches, or solutions, even if they seem unconventional or exploratory.
            Avoid immediate judgments or deep refinements—focus solely on divergent ideation.
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

    print("Divergence response: ", response.choices[0].message.content)

    return response.choices[0].message.content.strip()
