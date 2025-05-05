async function cargarFacturas() {
  const res = await fetch('/api/facturas');
  const data = await res.json();
  const lista = document.getElementById('lista-facturas');
  lista.innerHTML = '';
  data.forEach(factura => {
    const li = document.createElement('li');
    li.textContent = `${factura.fecha} | ${factura.numero} | ${factura.cliente} - $${factura.monto}`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => eliminarFactura(factura.id);
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

async function crearFactura() {
  const cliente = document.getElementById('cliente').value;
  const monto = document.getElementById('monto').value;
  const fecha = document.getElementById('fecha').value;
  const numero = document.getElementById('numero').value;
  await fetch('/api/facturas', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ cliente, monto, fecha, numero })
  });
  cargarFacturas();
}

async function eliminarFactura(id) {
  await fetch('/api/facturas/' + id, { method: 'DELETE' });
  cargarFacturas();
}

window.onload = cargarFacturas;
