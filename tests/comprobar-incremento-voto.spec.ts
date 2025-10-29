import { test, expect } from "@playwright/test";

test("El contador de votos se incrementa al votar por un auto", async ({ page }) => {
  //  Abrir el sitio
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 710, height: 735 });

  //  Iniciar sesión
  await page.waitForSelector('input[placeholder="Login"]');
  await page.waitForSelector('input[type="password"]');
  await page.fill('input[placeholder="Login"]', "Tu Usuario");
  await page.fill('input[type="password"]', "Tu contraseña");
  await page.click('button.btn-success');
  await expect(page.locator('a[href="/profile"]')).toBeVisible();

  //  Ir a Lamborghini → Diablo
  await page.click('img[title="Lamborghini"]');
  await page.click('text=Diablo');

  //  Obtener el contador de votos actual (usa el <strong>)
  const votosLocator = page.locator('h4 strong');
  const votosAntesTexto = await votosLocator.textContent();
  const votosAntes = parseInt(votosAntesTexto?.trim() || "0", 10);
  console.log(" Votos antes del voto:", votosAntes);

  //  Escribir comentario y votar
  await page.fill('#comment', "El mejor auto");
  await page.click('button:has-text("Vote!")');
  await page.waitForLoadState("networkidle");

  //  Validar mensaje de confirmación
  const mensaje = page.locator(".card-text");
  await expect(mensaje).toHaveText("Thank you for your vote!", { timeout: 10000 });

  //  Obtener nuevamente el número de votos
  const votosDespuesTexto = await votosLocator.textContent();
  const votosDespues = parseInt(votosDespuesTexto?.trim() || "0", 10);
  console.log(" Votos después del voto:", votosDespues);

  //  Verificar incremento
  expect(votosDespues).toBe(votosAntes + 1);

});
