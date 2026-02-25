/**
 * @module icons
 * Initialises all Lucide icons used across the site.
 * Centralises icon imports so adding/removing icons is a single-file change.
 */

import {
    createIcons,
    Zap, RefreshCw, ShieldCheck, Target,
    Mail, Phone, X, ChevronDown, ArrowDown, ArrowUp, ArrowRight,
    Instagram, Facebook, Clapperboard, Globe, Music2,
    Menu, Crown, Check, ChevronRight, ArrowLeftRight,
    FileText, Lightbulb, TrendingUp, CreditCard, Cuboid,
    Gift, FileImage, Timer, Info, Flame, Lock
} from 'lucide';

export function initIcons() {
    createIcons({
        icons: {
            Zap, RefreshCw, ShieldCheck, Target,
            Mail, Phone, X, ChevronDown, ArrowDown, ArrowUp, ArrowRight,
            Instagram, Facebook, Clapperboard, Globe, Music2,
            Menu, Crown, Check, ChevronRight, ArrowLeftRight,
            FileText, Lightbulb, TrendingUp, CreditCard, Cuboid,
            Gift, FileImage, Timer, Info, Flame, Lock
        }
    });
}
