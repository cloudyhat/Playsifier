MCP_CONFIDENCE_THRESHOLD = 0.65

def mcp_confident(confidence: float) -> bool:
    """
    Central decision gate for MCP intent confidence.
    """
    return confidence >= MCP_CONFIDENCE_THRESHOLD
