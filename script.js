fetch('data.json')
.then(response => response.json())
.then(data => {

  document.getElementById("totalItem").innerText = data.length;

  let reorder = data.filter(item => item.stock < item.minStock);
  let overstock = data.filter(item => item.stock > item.minStock * 2);

  document.getElementById("reorderItem").innerText = reorder.length;
  document.getElementById("overstockItem").innerText = overstock.length;

  const table = document.getElementById("stockTable");

  data.forEach(item => {
    let status = "AMAN";
    if(item.stock < item.minStock) status = "REORDER";
    if(item.stock > item.minStock * 2) status = "OVERSTOCK";

    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.stock}</td>
        <td>${item.minStock}</td>
        <td>${status}</td>
      </tr>
    `;
  });

  const ctx = document.getElementById('stockChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.name),
      datasets: [{
        label: 'Stock',
        data: data.map(item => item.stock)
      }]
    }
  });

});
