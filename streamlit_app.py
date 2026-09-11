"""Envelope Streamlit para o Mapa do Ecossistema SAP.

A app em si é React/Vite puro — o Streamlit não a executa nativamente,
só a incorpora: lê o build de produção (dist/), embebe o CSS e o JS
compilados directamente no HTML (ligações para /assets/... quebrariam
dentro do iframe do Streamlit) e mostra o resultado via st.iframe.

Correr:
    pip install -r requirements.txt
    streamlit run streamlit_app.py
"""

import re
import subprocess
import pathlib
import streamlit as st

RAIZ = pathlib.Path(__file__).parent
DIST = RAIZ / "dist"

st.set_page_config(page_title="Mapa do Ecossistema SAP", layout="wide")

if not (DIST / "index.html").exists():
    with st.spinner("A gerar o build de produção (npm run build)…"):
        resultado = subprocess.run(
            ["npm", "run", "build"], cwd=RAIZ, capture_output=True, text=True
        )
    if resultado.returncode != 0:
        st.error(
            "`npm run build` falhou. Corre `npm i` na pasta do projecto antes de "
            "abrir esta página (o Streamlit não instala as dependências Node)."
        )
        st.code(resultado.stderr or resultado.stdout)
        st.stop()

html = (DIST / "index.html").read_text(encoding="utf-8")


def _inline_css(m: re.Match) -> str:
    conteudo = (DIST / m.group(1).lstrip("/")).read_text(encoding="utf-8")
    return f"<style>{conteudo}</style>"


def _inline_js(m: re.Match) -> str:
    conteudo = (DIST / m.group(1).lstrip("/")).read_text(encoding="utf-8")
    return f'<script type="module">{conteudo}</script>'


html = re.sub(r'<link\s+rel="stylesheet"[^>]*\shref="([^"]+)"[^>]*>', _inline_css, html)
html = re.sub(r'<script\s+type="module"[^>]*\ssrc="([^"]+)"[^>]*></script>', _inline_js, html)

# st.iframe (substitui o descontinuado st.components.v1.html) mede a altura
# real do conteúdo quando se lhe passa uma string HTML — não precisa de
# altura fixa nem de scroll manual.
st.iframe(html, height="content", width="stretch")
