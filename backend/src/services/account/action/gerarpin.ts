export function gerarPin() {
    let pin = Math.floor(Math.random() * 1000000);
  
    // Garante que o PIN tenha 6 dígitos
    while(pin < 100000) {
      pin = Math.floor(Math.random() * 1000000);
    }
  
    return pin;
  }