import { baseURL } from "./request";
import dafaultAvatar from '../assets/avatar.png'

export function getAvatarImage(path: string): string {

  return path ? baseURL + path : dafaultAvatar
}

