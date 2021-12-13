const button = document.querySelector('button');
(async function () {
  const res = await fetch('http://localhost:3000/api/auth/table', {
    headers: {
      'X-AUTH-TOKEN': localStorage.getItem('X-AUTH-TOKEN'),
    },
  });
  const { err, data } = await res.json();
  if (err !== null)
    window.location.replace('http://127.0.0.1:5500/signup.html');
  const table = document.querySelector('table');
  console.log(data);

  data.forEach((element) => {
    table.innerHTML += `
             <tr>
             <td>${element.name}</td>
             <td>${element.username}</td>
             <td>${element.email}</td>
             <td>${element.id}</td>
             </tr>
             `;
  });
})();

button.addEventListener('click', () => {
  window.localStorage.removeItem('X-AUTH-TOKEN');
  window.location.replace('http://127.0.0.1:5500/login.html');
});
