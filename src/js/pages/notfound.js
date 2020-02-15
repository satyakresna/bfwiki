import { closeMenu } from "../utils/utils.js";

export function notfound() {
  closeMenu();
  document.querySelector('main').textContent = 'Not found';
}