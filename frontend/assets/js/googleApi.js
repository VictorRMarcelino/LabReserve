function handleCredentialResponse(response) {
  const token = response.credential;

  fetch("auth_google.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Usuário autenticado:", data);
    // aqui você pode redirecionar o usuário
  })
  .catch(err => console.error("Erro:", err));
}