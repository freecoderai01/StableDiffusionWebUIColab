from IPython.display import display, Javascript
display(Javascript('''
	var gradiolink = document.querySelector('[href*="gradio"]');
	var ngroklink = document.querySelector('[href*="ngrok"]');
	window.open(gradiolink);
	window.open(ngroklink);
'''))
