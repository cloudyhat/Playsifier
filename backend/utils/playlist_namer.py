import random

def generate_default_name(filters):
    parts = []

    if filters.mood:
        parts.append(filters.mood.title())

    if filters.genres:
        parts.append(" & ".join(g.title() for g in filters.genres[:2]))

    if filters.max_duration_sec:
        minutes = filters.max_duration_sec // 60
        parts.append(f"{minutes} Min")

    if not parts:
        parts.append("Personalized Mix")

    suffixes = [
        "Vibes",
        "Session",
        "Flow",
        "Energy",
        "Collection",
        "Blend"
    ]

    return f"{' '.join(parts)} {random.choice(suffixes)}"