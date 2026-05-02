import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
    nom: string;
    marque: string;
    prix: number;
    quantity: number;
}

const STORAGE_KEY = 'ecommerce-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    // Charge depuis localStorage au démarrage (uniquement côté navigateur)
    items = signal<CartItem[]>(this.loadFromStorage());

    total = computed(() =>
        this.items().reduce((sum, item) => sum + item.prix * item.quantity, 0)
    );

    itemCount = computed(() =>
        this.items().reduce((sum, item) => sum + item.quantity, 0)
    );

    constructor() {
        // À chaque modification du panier, sauvegarder
        effect(() => {
        const current = this.items();
        if (this.isBrowser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        }
        });
    }

    private loadFromStorage(): CartItem[] {
        if (!this.isBrowser) return [];
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    addItem(product: { nom: string; marque: string; prix: number }) {
        this.items.update(current => {
        const existing = current.find(i => i.nom === product.nom);
        if (existing) {
            return current.map(i =>
            i.nom === product.nom ? { ...i, quantity: i.quantity + 1 } : i
            );
        }
        return [...current, { ...product, quantity: 1 }];
        });
    }

    removeItem(nom: string) {
        this.items.update(current => {
        const existing = current.find(i => i.nom === nom);
        if (existing && existing.quantity > 1) {
            return current.map(i =>
            i.nom === nom ? { ...i, quantity: i.quantity - 1 } : i
            );
        }
        return current.filter(i => i.nom !== nom);
        });
    }

    clear() {
        this.items.set([]);
    }
}