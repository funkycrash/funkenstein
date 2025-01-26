class AudioPlayer extends HTMLElement {
    connectedCallback() {
        const src = this.getAttribute('src');
        const title = this.getAttribute('title');
        const id = `waveform-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for the waveform container

        this.innerHTML = `
    <div style="text-align: center;">
        <h4 style="color: white; margin: 10px 0;">${title}</h4>
        <div id="${id}-placeholder" style="width: 100%; height: 80px; background: rgba(255, 255, 255, 0.2); display: flex; align-items: center; justify-content: center; font-size: 14px; color: #fff;">Loading...</div>
        <div id="${id}" style="width: 100%; height: 80px; display: none;"></div>
        <button id="${id}-play" style="margin-top: 10px; background-color: #ff4500; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">Play</button>
    </div>
`;

        const placeholder = this.querySelector(`#${id}-placeholder`);
        const waveformContainer = this.querySelector(`#${id}`);
        const playButton = this.querySelector(`#${id}-play`);

        const waveform = WaveSurfer.create({
            container: `#${id}`,
            waveColor: '#ff4500',
            progressColor: '#ffffff',
            barWidth: 2,
            responsive: true,
            height: 80
        });

        // Show the waveform and hide the placeholder once the audio is ready
        waveform.on('ready', () => {
            placeholder.style.display = 'none';
            waveformContainer.style.display = 'block';
        });

        // Handle play/pause button functionality
        playButton.addEventListener('click', () => {
            if (waveform.isPlaying()) {
                waveform.pause();
                playButton.textContent = 'Play';
            } else {
                waveform.play();
                playButton.textContent = 'Pause';
            }
        });

        // Load the audio
        waveform.load(src);
    }
}

customElements.define('audio-player', AudioPlayer);
