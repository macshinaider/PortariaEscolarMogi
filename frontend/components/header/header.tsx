export default function Header() {
  function redirect(rota: string) {
    if (rota === "login") {
      window.location.href = "/login";
    }
    if (rota === "register") {
      window.location.href = "/register";
    }
  }

  return (
    <div className="flex justify-between p-3 shadow-md items-center">
      <div className="flex flex-col">
        <h1 className="font-sans font-medium text-3xl">Portaria Créche</h1>
        <span className="text-xs">A Segurança do seu Tesouro!</span>
      </div>
      <div className="flex gap-3 items-center">
        <button onClick={() => redirect("register")}>Cadastrar Escola</button>
        <button
          onClick={() => redirect("login")}
          className="bg-blue-500 p-1 rounded cursor-pointer hover:bg-blue-400 text-white"
        >
          Entrar no Sistema
        </button>
      </div>
    </div>
  );
}
