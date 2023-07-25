import { atom } from 'jotai';
import PreEditor from '../editor/core';

export const authoringEditorAtom = atom<PreEditor | null>(null);

export const activeElementsAtom = atom<HTMLElement[] | null>(null);

export const toastAtom = atom({ message: '' });
