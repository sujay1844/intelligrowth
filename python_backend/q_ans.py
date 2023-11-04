from transformers import AutoTokenizer, AutoModelForQuestionAnswering
import torch

def load_question_answering_model(model_name):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForQuestionAnswering.from_pretrained(model_name)
    return tokenizer, model

def answer_question(tokenizer, model, question, context):
    inputs = tokenizer(question, context, return_tensors="pt")
    outputs = model(**inputs)
    
    start_logits = outputs.start_logits
    end_logits = outputs.end_logits
    
    start_position = torch.argmax(start_logits, dim=1).item()
    end_position = torch.argmax(end_logits, dim=1).item()
    
    answer = tokenizer.decode(inputs["input_ids"][0][start_position:end_position + 1])
    return answer

if __name__ == "__main__":
    model_name = "bert-large-uncased-whole-word-masking-finetuned-squad"
    tokenizer, model = load_question_answering_model(model_name)
    
    question = "What is photosynthesis?"
    context = "Photosynthesis is the process by which plants and some microorganisms convert light energy into chemical energy."
    
    answer = answer_question(tokenizer, model, question, context)
    
    print("Answer:", answer)
