document.querySelectorAll('[data-capitalize]').forEach(field => {
  function capitalize() {
    const pattern = field.dataset.capitalize === 'words' ? /(^|[\s-])(\p{L})/gu : /^(\s*)(\p{L})/u;
    const value = field.value.replace(pattern, (_, prefix, letter) => prefix + letter.toLocaleUpperCase('hu'));
    if (value === field.value) return;

    const { selectionStart, selectionEnd, selectionDirection } = field;
    field.value = value;
    field.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  field.addEventListener('input', event => {
    if (!event.isComposing) capitalize();
  });
  field.addEventListener('compositionend', capitalize);
});
