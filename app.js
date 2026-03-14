const movimientos = [
  {
    fecha: "2026-03-02",
    concepto: "Renta de oficina",
    categoria: "Operaciones",
    tipo: "egreso",
    monto: 18500,
  },
  {
    fecha: "2026-03-05",
    concepto: "Servicios de internet",
    categoria: "Servicios",
    tipo: "gasto",
    monto: 1450,
  },
  {
    fecha: "2026-03-07",
    concepto: "Compra de papeleria",
    categoria: "Administracion",
    tipo: "gasto",
    monto: 980,
  },
  {
    fecha: "2026-03-09",
    concepto: "Pago a proveedor",
    categoria: "Operaciones",
    tipo: "egreso",
    monto: 9200,
  },
  {
    fecha: "2026-03-11",
    concepto: "Licencias de software",
    categoria: "Tecnologia",
    tipo: "gasto",
    monto: 3200,
  },
];

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const totalEgresos = movimientos
  .filter((item) => item.tipo === "egreso")
  .reduce((sum, item) => sum + item.monto, 0);

const totalGastos = movimientos
  .filter((item) => item.tipo === "gasto")
  .reduce((sum, item) => sum + item.monto, 0);

const categorias = movimientos.reduce((acc, item) => {
  acc[item.categoria] = (acc[item.categoria] || 0) + item.monto;
  return acc;
}, {});

document.querySelector("#total-egresos").textContent = currency.format(totalEgresos);
document.querySelector("#total-gastos").textContent = currency.format(totalGastos);
document.querySelector("#total-movimientos").textContent = movimientos.length;

document.querySelector("#categorias").innerHTML = Object.entries(categorias)
  .sort(([, a], [, b]) => b - a)
  .map(
    ([categoria, monto]) => `
      <article class="category-card">
        <p>${categoria}</p>
        <strong>${currency.format(monto)}</strong>
      </article>
    `,
  )
  .join("");

document.querySelector("#movimientos").innerHTML = movimientos
  .sort((a, b) => b.fecha.localeCompare(a.fecha))
  .map(
    (movimiento) => `
      <tr>
        <td>${movimiento.fecha}</td>
        <td>${movimiento.concepto}</td>
        <td>${movimiento.categoria}</td>
        <td>
          <span class="type-pill type-${movimiento.tipo}">
            ${movimiento.tipo}
          </span>
        </td>
        <td>${currency.format(movimiento.monto)}</td>
      </tr>
    `,
  )
  .join("");
