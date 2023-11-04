import transformers
from langchain.llms import HuggingFacePipeline
from torch import cuda, bfloat16
import sqlite3

class HuggingFaceModel:
    def __init__(self, model_id, hf_auth):
        self.model_id = model_id
        self.hf_auth = hf_auth
        self.generate_text = self.initialize_model()

    def initialize_model(self):
        device = f'cuda:{cuda.current_device()}' if cuda.is_available() else 'cpu'

        bnb_config = transformers.BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type='nf4',
            bnb_4bit_use_double_quant=True,
            bnb_4bit_compute_dtype=bfloat16
        )

        model_config = transformers.AutoConfig.from_pretrained(
            self.model_id,
            use_auth_token=self.hf_auth
        )

        model = transformers.AutoModelForCausalLM.from_pretrained(
            self.model_id,
            trust_remote_code=True,
            config=model_config,
            quantization_config=bnb_config,
            device_map='auto',
            use_auth_token=self.hf_auth
        )
        model.eval()
        print(f"Model loaded on {device}")

        tokenizer = transformers.AutoTokenizer.from_pretrained(
            self.model_id,
            use_auth_token=self.hf_auth
        )

        generate_text = transformers.pipeline(
            model=model, tokenizer=tokenizer,
            return_full_text=True,
            task='text-generation',
            temperature=0.0,
            max_new_tokens=512,
            repetition_penalty=1.1
        )

        return generate_text

# class HuggingFacePipeline:
#     def __init__(self, model):
#         self.model = model

#     def generate_text(self, prompt):
#         result = self.model(prompt)
#         return result[0]["generated_text"]
class HuggingFacePipeline:
    def __init__(self, model):
        self.model = model
        
    def fetch_context_from_achroma_database(self):
        # Replace with code to retrieve embedded vectors from your chromaDB
        connection = sqlite3.connect(self.db_path)
        cursor = connection.cursor()

        # Modify the SQL query according to your table structure
        query = "SELECT embedded_vector FROM your_table WHERE your_condition"

        cursor.execute(query)
        results = cursor.fetchall()

        # Assuming you have retrieved embedded vectors as a list
        embedded_vectors = [result[0] for result in results]

        # Convert embedded vectors to a context string (you need to implement this)
        context = self.embedded_vectors_to_context(embedded_vectors)

        cursor.close()
        connection.close()

        return context

    def generate_text_with_context(self):
        # Fetch context from the achroma database
        context = self.fetch_context_from_achroma_database()

        # Provide the context as a prompt to the Hugging Face model
        prompt = context

        # Generate text using the model
        result = self.model.generate_text(prompt)

        return result

if __name__ == "__main__":
    model_id = 'meta-llama/Llama-2-7b-chat-hf'
    hf_auth = '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'

    hugging_face_model = HuggingFaceModel(model_id, hf_auth)
    hugging_face_pipeline = HuggingFacePipeline(hugging_face_model.generate_text)

    prompt = "Explain to me the difference between nuclear fission and fusion."
    result = hugging_face_pipeline.generate_text(prompt)
    print(result)
