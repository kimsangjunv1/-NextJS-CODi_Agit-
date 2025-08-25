import * as dotenv from 'dotenv';
import { test, expect } from '@playwright/test';

dotenv.config();

// npx playwright test --headed --slow-mo=300;
const TEST_TYPE = "0";
const TEST_HASH = "pm4c6gcu6em";
const TEST_URL = `${ process.env.NEXT_PUBLIC_DEV_URL }/?hash=${ TEST_HASH }&flowtype=${ TEST_TYPE }`;

test('홈페이지 UI 요소를 테스트한다', async ({ page }) => {
  // 1. 홈페이지 접속
  await page.goto( TEST_URL ); // 또는 배포 URL

  // 2. 특정 텍스트가 있는지 확인
//   await expect(page.getByText('환영합니다')).toBeVisible();

  // 3. 버튼 클릭
//   await page.getByRole('button', { name: '더 알아보기' }).click();
    for( let i = 0; i <= 3; i++ ) {
        await page.getByTestId(`cart-price-increase-${ i }`).click();
    }

  // 4. 모달이 나타났는지 확인 (예: aria-label 또는 텍스트로 접근)
//   const modal = page.getByRole('dialog'); // 또는 getByText('모달 내용')
//   await expect(modal).toBeVisible();

  // 5. 모달 안에 특정 텍스트가 있는지 확인
//   await expect(modal.getByText('이것은 모달입니다')).toBeVisible();

  // 6. 모달 닫기 버튼 클릭
//   await modal.getByRole('button', { name: '닫기' }).click();

  // 7. 모달이 사라졌는지 확인
//   await expect(modal).not.toBeVisible();
  
//   await expect(page.getByTestId('cart-price-value')).toHaveText('100,00');
    const priceEl = page.getByTestId('cart-price-value');
    const valueAttr = await priceEl.getAttribute('data-value');

    expect(valueAttr).toBe('40000');
});
