from langgraph import StateGraph, END, START, MessagesState


def process_user_input(state, message):
    return state, message


def generate_micro_learning(state, message):
    return state, message


def save_micro_learning(state, message):
    return state, message


def return_micro_learning(state, message):
    return state, message


micro_learnings_graph = StateGraph(MessagesState)
# First node should process the user's input and format it with the correct data for the next node
# Second node should generate the micro learning
# Third node should save the micro learning to the database
# Fourth node should return the micro learning to the user

micro_learnings_graph.add_node(
    "process_user_input",
    process_user_input,
    MessagesState(messages=[]),
)

micro_learnings_graph.add_node(
    "generate_micro_learning",
    generate_micro_learning,
    MessagesState(messages=[]),
)

micro_learnings_graph.add_node(
    "save_micro_learning",
    save_micro_learning,
    MessagesState(messages=[]),
)

micro_learnings_graph.add_node(
    "return_micro_learning",
    return_micro_learning,
    MessagesState(messages=[]),
)

micro_learnings_graph.add_edge(START, "process_user_input")
micro_learnings_graph.add_edge("process_user_input", "generate_micro_learning")
micro_learnings_graph.add_edge("generate_micro_learning", "save_micro_learning")
micro_learnings_graph.add_edge("save_micro_learning", "return_micro_learning")
micro_learnings_graph.add_edge("return_micro_learning", END)

micro_learnings_graph.compile()
