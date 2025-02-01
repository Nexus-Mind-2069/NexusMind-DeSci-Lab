import torch
def sample_model():
    return torch.rand(1, 3, 224, 224)
if __name__ == '__main__':
    print(sample_model())
