import { atom } from 'jotai';
import PreEditor from '../PreAuthoring/editor/core';

export const authoringEditorAtom = atom<PreEditor | null>(null);

export const activeElementsAtom = atom<HTMLElement | null>(null);

export const toastAtom = atom({ message: '' });
