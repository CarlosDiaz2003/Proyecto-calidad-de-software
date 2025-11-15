import { test, expect } from "@playwright/test";

test.setTimeout(60000);

test("Editar perfil de usuario en Buggy Cars", async ({ page }) => {
  // Ir al sitio
  await page.goto("https://buggy.justtestit.org/");
  await page.setViewportSize({ width: 1280, height: 800 });

  // Login
  await page.fill('input[name="login"]', "usuariodeprueba2");
  await page.fill('input[name="password"]', "Tucontraseña1!");
  await page.click('button:has-text("Login")');

  // Ir a Profile
  await page.waitForSelector('a:has-text("Profile")');
  await page.click('a:has-text("Profile")');

  // Esperar formulario
  await page.waitForSelector('input[name="firstName"]');

  // Editar datos
  await page.fill('input[name="firstName"]', "Carlos");
  await page.fill('input[name="lastName"]', "Contreras");
  await page.fill('input[name="address"]', "Zona 10, Guatemala");
  await page.fill('input[name="phone"]', "+502 1234 5678");
  await page.fill('input[name="hobby"]', "Automovilismo");

  // Guardar
  await page.click('button:has-text("Save")');

  // Verificar mensaje
  const mensaje = page.locator(".result:not(.hidden-md-down)");
  await expect(mensaje).toHaveText(/The profile has been saved/);
});
