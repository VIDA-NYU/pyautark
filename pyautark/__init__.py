import importlib.metadata

try:
    __version__ = importlib.metadata.version("pyautark")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

from .pyautark import PyAutark, render
