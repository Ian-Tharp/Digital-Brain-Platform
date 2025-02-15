from setup import get_openai_client
from textwrap import dedent

def catalyst_thinking(user_input: str, convergence_response: str, divergence_response: str) -> str:
    client = get_openai_client()
    prompt = dedent(
        """
        Context:
        You are now tasked with curating the full ideation process by merging the expansive output from the divergence phase with the refined and synthesized ideas
        from the convergence phase. Your goal is to produce a final response that embodies the principles of Catalyst Creativity—balancing creative exploration with
        critical refinement—to generate innovative and actionable insights.

        Instructions:

        1. Integration of Divergence and Convergence:
            Review Both Phases: Begin by examining the wide-ranging ideas produced during the divergence phase alongside the curated and evaluated concepts from the
            convergence phase.
            Identify Synergies: Detect overlapping themes, complementary ideas, or standout concepts that bridge both creative breadth and practical refinement.

        2. Structured Synthesis:
            Chain-of-Thought Explanation: Clearly articulate the thought process that connects the divergent ideas with the convergent selections. Describe how you
            arrived at the final synthesis by merging insights from both phases.
            Organized Presentation: Present your final output in a structured format (such as bullet points, numbered steps, or clearly defined sections) that outlines
            the integration process.
        
        3. Emotional and Narrative Anchoring:
            Storytelling Elements: Infuse your final response with narrative or personal insights where appropriate. Ensure the output is not only logically sound but
            also resonates on an emotional level.
            Compelling Narrative: Illustrate how the synthesis of ideas can tell a cohesive story or serve a clear, relatable purpose.

        4. Balancing Constraints with Creative Freedom:
            Address Challenges: Revisit any constraints or challenges highlighted during the previous phases and demonstrate how they have been transformed into
            creative opportunities.
            Flexibility and Structure: Ensure that the final synthesis reflects both structured reasoning and imaginative exploration.

        5. Growth Mindset and Iterative Refinement:
            Reflect on the Journey: Acknowledge the iterative process—from the wide-reaching divergence to the focused convergence—and explain how feedback and
            reflection have shaped the final ideas.
            Future Considerations: Optionally, outline potential next steps or further iterations that could refine or expand upon the final output.

        6. Final Cohesion and Actionability:
            Unified Output: Synthesize the elements from both phases into a coherent and actionable set of ideas or solutions that address the original query.
            Clear Vision: Ensure the final output is both innovative and practical, providing clear insights and possible action steps based on the integrated
            ideation process.

        Task:
            Using the outputs from the divergence and convergence phases, generate a final, cohesive response that fully embodies the Catalyst Creativity framework.
            Your response should clearly explain the integration process, outline the key themes, and present an actionable and compelling final synthesis that
            leverages both creative exploration and critical evaluation.
        """
    )

    response = client.chat.completions.create(
        model="o3-mini",
        messages=[
            {
                "role": "system",
                "content": prompt,
            },
            {
                "role": "user",
                "content": f"User input: {user_input}\nConvergence response: {convergence_response}\nDivergence response: {divergence_response}",
            },
        ]
    )

    print("Catalyst response: ", response.choices[0].message.content)

    return response.choices[0].message.content.strip()
