//checks to see if it needs to run
if (!loadedVersions.includes('/js/frames/versionNeoBasics.js')) {
    loadedVersions.push('/js/frames/versionNeoBasics.js');
    document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `neoBasics`); initializeNeoBasicsColorControls();">Kamigawa Basics</h3>';
    var newHTML = document.createElement('div');
    newHTML.id = 'creator-menu-neoBasics';
    newHTML.classList.add('hidden');
    newHTML.innerHTML = `
    <div class='readable-background padding'>
        <h5 class='padding margin-bottom input-description'>Adjust the title bar's height:</h5>
        <input id='nb-change' class='input' type='number' oninput='stretchNeoBasics();' min='330', max='1000', value='330', step='10'>
        
        <h5 class='padding margin-bottom input-description'>Element Colors:</h5>
        <div id='neo-basics-color-controls'></div>
    </div>`;
    document.querySelector('#creator-menu-sections').appendChild(newHTML);
    loadScript('/js/frames/manaSymbolsMysticalArchiveJP.js');
    
    // Initialize color controls with retries
    [100, 500, 1000, 2000, 3000].forEach(delay => setTimeout(initializeNeoBasicsColorControls, delay));
}

const COLOR_PRESETS = {
    'auto': 'Default',
    'white': 'White',
    'blue': 'Blue', 
    'black': 'Black',
    'red': 'Red',
    'green': 'Green',
    'colorless': 'Colorless',
	'purple': 'Black (Alt)',
    'custom': 'Custom'
};

const COLOR_VALUES = {
    'white': '#5e564b',
    'blue': '#007eb9',
    'black': '#000004',
    'red': '#e43a2b',
    'green': '#007b46',
	'purple': '#46375f',
    'colorless': '#9a9a9a'
};

function initializeNeoBasicsColorControls() {
    const container = document.querySelector('#neo-basics-color-controls');
    const neoBasicsFrame = card.frames.find(frame => frame.src.includes('neo/basics/'));
    
    if (!container || !neoBasicsFrame?.stretch) {
        console.log('Neo Basics color controls not ready yet - container:', !!container, 'frame:', !!neoBasicsFrame, 'stretch:', !!neoBasicsFrame?.stretch);
        return;
    }
    
    // Always clear and rebuild controls to ensure they're current
    container.innerHTML = '';
    
    // Create combined section with dropdowns and color pickers aligned
    const controlsSection = document.createElement('div');
    controlsSection.innerHTML = `
        <h5 class='padding input-description'>Element Colors:</h5>
        <div class='padding input-grid margin-bottom' style="display: flex; gap: 10px;">
            ${neoBasicsFrame.stretch.map(stretchElement => {
                const elementName = stretchElement.name;
                
                // Initialize all Neo Basics frames
                card.frames.filter(frame => frame.src.includes('neo/basics/')).forEach(initializeColorOverrides);
                
                const override = neoBasicsFrame.colorOverrides[elementName];
                
                // Determine current selection based on override values
                let currentSelection = 'auto';
                if (override.mode === 'manual') {
                    // Check if the color matches any preset
                    const matchingPreset = Object.entries(COLOR_VALUES).find(([key, value]) => 
                        value.toLowerCase() === override.color.toLowerCase()
                    );
                    currentSelection = matchingPreset ? matchingPreset[0] : 'custom';
                }
                
                return `
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
                        <div>
                            <label style="font-size: 22px; margin-bottom: 4px; font-weight: bold; text-align: center; display: block;">
                                ${elementName.charAt(0).toUpperCase() + elementName.slice(1)}
                            </label>
                            <select class='input' id="select-${elementName}" onchange="handleNeoBasicsColorChange('${elementName}', this.value)" style="font-size: 16px; width: 100%;">
                                ${Object.entries(COLOR_PRESETS).map(([value, label]) => 
                                    `<option value="${value}" ${currentSelection === value ? 'selected' : ''}>${label}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div id="color-picker-container-${elementName}" style="display: ${currentSelection === 'custom' ? 'block' : 'none'};">
                            <input type="color" 
                                   id="color-picker-${elementName}"
                                   class='input'
                                   value="${override.color}" 
                                   onchange="updateNeoBasicsColorOverride('${elementName}', 'color', this.value)"
                                   style="width: 100%; height: 40px;">
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    container.appendChild(controlsSection);
    
    // Add reset button after all color controls with same styling structure
    const resetButton = document.createElement('div');
    resetButton.style.marginTop = '20px';
    resetButton.innerHTML = `
        <div class='padding input-grid margin-bottom'>
            <button class='input' onclick="resetAllNeoBasicsColors()" style="background-color:rgb(51, 51, 51); color: white; border: none; padding: 8px 16px; cursor: pointer;">
                Reset All Colors to Default
            </button>
        </div>
    `;
    container.appendChild(resetButton);
    
    console.log('Neo Basics color controls initialized successfully');
}

function handleNeoBasicsColorChange(elementName, selectedValue) {
    const colorPickerContainer = document.getElementById(`color-picker-container-${elementName}`);
    const colorPicker = document.getElementById(`color-picker-${elementName}`);
    
    if (selectedValue === 'auto') {
        // Set to auto mode
        updateNeoBasicsColorOverride(elementName, 'mode', 'auto');
        colorPickerContainer.style.display = 'none';
    } else if (selectedValue === 'custom') {
        // Set to manual mode with current color picker value
        updateNeoBasicsColorOverride(elementName, 'mode', 'manual');
        updateNeoBasicsColorOverride(elementName, 'color', colorPicker.value);
        colorPickerContainer.style.display = 'block';
    } else {
        // Set to manual mode with preset color
        const presetColor = COLOR_VALUES[selectedValue];
        colorPicker.value = presetColor;
        updateNeoBasicsColorOverride(elementName, 'mode', 'manual');
        updateNeoBasicsColorOverride(elementName, 'color', presetColor);
        colorPickerContainer.style.display = 'none';
    }
}

function handleNeoBasicsColorChange(elementName, selectedValue) {
    const colorPickerContainer = document.getElementById(`color-picker-container-${elementName}`);
    const colorPicker = document.getElementById(`color-picker-${elementName}`);
    
    if (selectedValue === 'auto') {
        // Set to auto mode
        updateNeoBasicsColorOverride(elementName, 'mode', 'auto');
        colorPickerContainer.style.display = 'none';
    } else if (selectedValue === 'custom') {
        // Set to manual mode with current color picker value
        updateNeoBasicsColorOverride(elementName, 'mode', 'manual');
        updateNeoBasicsColorOverride(elementName, 'color', colorPicker.value);
        colorPickerContainer.style.display = 'flex';
    } else {
        // Set to manual mode with preset color
        const presetColor = COLOR_VALUES[selectedValue];
        colorPicker.value = presetColor;
        updateNeoBasicsColorOverride(elementName, 'mode', 'manual');
        updateNeoBasicsColorOverride(elementName, 'color', presetColor);
        colorPickerContainer.style.display = 'none';
    }
}

function handleNeoBasicsColorChange(elementName, selectedValue) {
    const colorPickerContainer = document.getElementById(`color-picker-container-${elementName}`);
    const colorPicker = document.getElementById(`color-picker-${elementName}`);
    
    if (selectedValue === 'auto') {
        // Set to auto mode
        updateNeoBasicsColorOverride(elementName, 'mode', 'auto');
        colorPickerContainer.style.display = 'none';
    } else if (selectedValue === 'custom') {
        // Set to manual mode with current color picker value
        updateNeoBasicsColorOverride(elementName, 'mode', 'manual');
        updateNeoBasicsColorOverride(elementName, 'color', colorPicker.value);
        colorPickerContainer.style.display = 'flex';
    } else {
        // Set to manual mode with preset color
        const presetColor = COLOR_VALUES[selectedValue];
        colorPicker.value = presetColor;
        updateNeoBasicsColorOverride(elementName, 'mode', 'manual');
        updateNeoBasicsColorOverride(elementName, 'color', presetColor);
        colorPickerContainer.style.display = 'none';
    }
}

function resetAllNeoBasicsColors() {
    const neoBasicsFrame = card.frames.find(frame => frame.src.includes('neo/basics/'));
    
    if (!neoBasicsFrame?.stretch) return;
    
    // Reset all color overrides to auto mode
    neoBasicsFrame.stretch.forEach(stretchElement => {
        const elementName = stretchElement.name;
        
        // Reset in all Neo Basics frames
        card.frames.filter(frame => frame.src.includes('neo/basics/')).forEach(frame => {
            if (frame.colorOverrides && frame.colorOverrides[elementName]) {
                frame.colorOverrides[elementName].mode = 'auto';
            }
        });
        
        // Update UI - reset dropdown to "auto"
        const selectElement = document.getElementById(`select-${elementName}`);
        if (selectElement) {
            selectElement.value = 'auto';
        }
        
        // Hide color picker container
        const colorPickerContainer = document.getElementById(`color-picker-container-${elementName}`);
        if (colorPickerContainer) {
            colorPickerContainer.style.display = 'none';
        }
    });
    
    // Redraw frames to apply auto colors
    card.frames.filter(frame => frame.src.includes('neo/basics/')).forEach(frame => {
        if (frame.stretch) stretchSVG(frame);
    });
    
    drawFrames();
    
    console.log('All Neo Basics colors reset to default');
}

function updateNeoBasicsColorOverride(elementName, property, value) {
    // Update all Neo Basics frames
    card.frames.filter(frame => frame.src.includes('neo/basics/')).forEach(frame => {
        if (!frame.colorOverrides) frame.colorOverrides = {};
        if (!frame.colorOverrides[elementName]) frame.colorOverrides[elementName] = { mode: 'auto', color: '#ffffff' };
        frame.colorOverrides[elementName][property] = value;
        
        if (frame.stretch) stretchSVG(frame);
    });
    
    drawFrames();
}

function stretchNeoBasics() {
    const change = [0, (parseInt(document.querySelector('#nb-change').value) - 330) / 2100];
    
    card.frames.filter(frame => frame.src.includes('neo/basics/') && frame.stretch).forEach(frame => {
        initializeColorOverrides(frame);
        frame.stretch.forEach(stretch => stretch.change = change);
        card.text.title.height = change[1] + 500 / 2100;
        drawTextBuffer();
        stretchSVG(frame);
    });
    
    // Always reinitialize color controls after stretching
    setTimeout(initializeNeoBasicsColorControls, 100);
}

function initializeColorOverrides(frame) {
    if (frame.stretch && !frame.colorOverrides) {
        frame.colorOverrides = {};
        frame.stretch.forEach(stretchElement => {
            frame.colorOverrides[stretchElement.name] = { mode: 'auto', color: '#ffffff' };
        });
    }
}