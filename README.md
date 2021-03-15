# OpenManual

Otevřený manuál pro online výuku

## Koncept

Protože učitelé nemají moc zkušeností s počítači, chci udělat manuál věcí, které by potřebovali vědět při online výuce.

## Jak přispývat

Protože je tento manuál **otevřený**, každý může něco přidat.

### GitHub Issues (doporučeno)

1. Běžte do kolonky Issues
2. Vytvořte nový issue
3. Vytvořte článek v MarkDown
4. Přidejte tag `nový článek`
5. Spolupracujte s ostatními

### Modifikace zdrojového kódu

1. Naklonujte repo. Doporučuji použít [GitHub Desktop](https://desktop.github.com).
2. Otevřete repo v textovém editoru. Doporučuji [VSCode](https://code.visualstudio.com).
3. Instalujte dependence - `npm install`
4. Zkopírujte template článek (`template.md`) do `pages/articles` a pojmenujte ho s `snake_case`.
5. Napište svůj článek v MarkDown / MDX
6. Zapněte devserver - `npm run dev`
7. Pokud bude vše v pořádku, commitněte své změny do forku a založte pull request.