import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
    test('should display the login page', async ({ page }) => {
        await page.goto('/login');

        await expect(page).toHaveURL('/login');
        await expect(page.getByRole('heading', { name: /connexion/i })).toBeVisible();
        await expect(page.getByLabel(/email/i)).toBeVisible();
        await expect(page.getByLabel(/mot de passe/i)).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.goto('/login');

        await page.getByLabel(/email/i).fill('invalid@email.com');
        await page.getByLabel(/mot de passe/i).fill('wrongpassword');
        await page.getByRole('button', { name: /se connecter/i }).click();

        await expect(page.getByText(/Invalid credentials/i)).toBeVisible();
    });

    test('should login successfully and redirect', async ({ page }) => {
        await page.goto('/login');

        await page.getByLabel(/email/i).fill('admin@admin.com');
        await page.getByLabel(/mot de passe/i).fill('Azerty123456!');
        await page.getByRole('button', { name: /se connecter/i }).click();

        await expect(page).toHaveURL('/home');
        await expect(page.getByText(/bienvenue/i)).toBeVisible();
    });

    test('should logout successfully', async ({ page }) => {
        // Login d'abord
        await page.goto('/login');
        await page.getByLabel(/email/i).fill('admin@admin.com');
        await page.getByLabel(/mot de passe/i).fill('Azerty123456!');
        await page.getByRole('button', { name: /se connecter/i }).click();
        await expect(page).toHaveURL('/home');

        // Logout
        await page.getByRole('button', { name: /déconnexion/i }).click();
        await expect(page).toHaveURL('/login');
    });
});
