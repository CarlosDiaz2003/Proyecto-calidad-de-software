import { test, expect } from '@playwright/test';

test('Registro de nuevo usuario en Buggy Cars', async ({ page }) => {
  //  Abrir la página principal
  await page.goto('https://buggy.justtestit.org/');
  await page.setViewportSize({ width: 710, height: 735 });

  // Ir al enlace "Register"
  await page.click('text=Register');

  //  Completar el formulario de registro
  await page.fill('#username', 'Carlos.');
  await page.fill('#firstName', 'Carloss');
  await page.fill('#lastName', 'Diaz');
  await page.fill('#password', 'Gokuelmasgrande200.');
  await page.fill('#confirmPassword', 'Gokuelmasgrande200.');

  //  Enviar formulario
  await page.click('button:has-text("Register")');

  //  Verificar texto de confirmación
  await expect(page.locator('.result')).toHaveText('Registration is successful');

  //  Comprobar que la imagen de usuario esté presente
  await expect(page.locator('.img-fluid')).toBeVisible();
});
