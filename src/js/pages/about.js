import { closeMenu } from "../utils/utils.js";

export function about() {
  closeMenu();
  document.querySelector('main').textContent = 'About';
}