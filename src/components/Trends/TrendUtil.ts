export function loadTrends(src: string, id: string, onLoad: () => void) {
  const existingScript = document.getElementById(id);

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = true;
    script.onload = onLoad;
    document.body.appendChild(script);
  } else {
    onLoad();
  }
}
