from torch import nn

class StressANN(nn.Module):
  def __init__(self):
    super().__init__()

    self.inp_layer = nn.Linear(in_features=25,
                               out_features=64)

    self.hidden_layer = nn.Linear(in_features=64,
                                  out_features=64)

    self.activation = nn.ReLU()

    self.classifier = nn.Linear(in_features=64,
                                out_features=3)

  def forward(self, x):
    out = self.inp_layer(x)
    out = self.hidden_layer(out)
    out = self.activation(out)
    out = self.classifier(out)

    return out