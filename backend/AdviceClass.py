from pydantic import BaseModel

class StressAdvice(BaseModel):
    type_of_stress: str
    why_is_it_caused: str
    advantages_of_this_stress: list[str]
    disadvantages_of_this_stress: list[str]
    stress_score: str
    overcome_or_cope_with_this_stress: list[str]
