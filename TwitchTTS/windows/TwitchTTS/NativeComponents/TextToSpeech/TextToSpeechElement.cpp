#include "pch.h"
#include "TextToSpeechElement.h"
#include "TextToSpeechElement.g.cpp"
using namespace winrt;

namespace winrt::TwitchTTS::implementation {
  hstring TextToSpeechElement::GetText() noexcept {
    return text;
  }

  void TextToSpeechElement::SetText(hstring nextText) noexcept {
    text = nextText;
  }
}