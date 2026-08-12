/**
 * The Tap Frontend — Test Suite
 *
 * Tests the HTML structure, JavaScript logic, design system,
 * and data integrity of the agentic bar frontend.
 */

const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');

// ---- Document Structure ----

describe('Document Structure', () => {
  test('has valid HTML5 doctype', () => {
    expect(htmlContent.trim().toLowerCase().startsWith('<!doctype html>')).toBe(true);
  });

  test('has lang attribute on html element', () => {
    expect(htmlContent).toMatch(/<html\s+lang=/i);
  });

  test('has UTF-8 charset', () => {
    expect(htmlContent).toMatch(/<meta\s+charset=["']?utf-8["']?/i);
  });

  test('has viewport meta tag', () => {
    expect(htmlContent).toMatch(/<meta\s+name=["']viewport["']/i);
  });

  test('has descriptive title mentioning The Tap', () => {
    expect(htmlContent).toMatch(/<title>.*Tap.*<\/title>/i);
  });
});

// ---- Design System ----

describe('Design System', () => {
  test('defines CSS custom properties', () => {
    expect(htmlContent).toMatch(/:root\s*{/);
    expect(htmlContent).toMatch(/--bg\s*:/);
    expect(htmlContent).toMatch(/--amber\s*:/);
    expect(htmlContent).toMatch(/--text\s*:/);
  });

  test('uses dark background (#0a0908)', () => {
    expect(htmlContent).toMatch(/--bg:\s*#0a0908/i);
  });

  test('uses amber accent (#d4a24c)', () => {
    expect(htmlContent).toMatch(/--amber:\s*#d4a24c/i);
  });

  test('uses monospace font family', () => {
    expect(htmlContent).toMatch(/Courier\s+New/i);
  });

  test('defines glow pulse animation', () => {
    expect(htmlContent).toMatch(/glow-pulse/);
    expect(htmlContent).toMatch(/@keyframes\s+glow-pulse/);
  });

  test('glow pulse runs for 8 seconds', () => {
    expect(htmlContent).toMatch(/glow-pulse\s+8s/i);
  });

  test('defines fade-in animation for messages', () => {
    expect(htmlContent).toMatch(/@keyframes\s+fade-in/);
  });

  test('has gold color for promoted characters', () => {
    expect(htmlContent).toMatch(/--gold\s*:/);
  });
});

// ---- Layout Structure ----

describe('Layout Sections', () => {
  test('has ASCII art header', () => {
    expect(htmlContent).toMatch(/class=["']header["']/i);
    expect(htmlContent).toMatch(/<pre>/i);
  });

  test('has tide badge for bar energy', () => {
    expect(htmlContent).toMatch(/class=["']tide-badge["']/i);
    expect(htmlContent).toMatch(/id=["']tideBadge["']/i);
  });

  test('has sidebar for room list', () => {
    expect(htmlContent).toMatch(/class=["']sidebar["']/i);
    expect(htmlContent).toMatch(/id=["']roomList["']/i);
  });

  test('has conversation feed', () => {
    expect(htmlContent).toMatch(/class=["']conversation["']/i);
    expect(htmlContent).toMatch(/id=["']conversation["']/i);
  });

  test('has chat area', () => {
    expect(htmlContent).toMatch(/class=["']chat-area["']/i);
  });

  test('has who\'s here panel', () => {
    expect(htmlContent).toMatch(/class=["']whos-here["']/i);
    expect(htmlContent).toMatch(/id=["']whosHereList["']/i);
  });

  test('has message input', () => {
    expect(htmlContent).toMatch(/id=["']msgInput["']/i);
  });

  test('has registration modal', () => {
    expect(htmlContent).toMatch(/id=["']regModal["']/i);
  });

  test('has room header with title and signal', () => {
    expect(htmlContent).toMatch(/id=["']roomTitle["']/i);
    expect(htmlContent).toMatch(/id=["']roomSignal["']/i);
  });

  test('has room description element', () => {
    expect(htmlContent).toMatch(/id=["']roomDesc["']/i);
  });

  test('has name input for character', () => {
    expect(htmlContent).toMatch(/id=["']nameInput["']/i);
  });

  test('has character info display', () => {
    expect(htmlContent).toMatch(/id=["']charInfo["']/i);
  });
});

// ---- Three-Panel Layout ----

describe('Three-Panel Layout', () => {
  test('sidebar has fixed width (180px)', () => {
    expect(htmlContent).toMatch(/\.sidebar\s*\{[^}]*width:\s*180px/i);
  });

  test('main container uses flexbox', () => {
    expect(htmlContent).toMatch(/\.main\s*\{[^}]*display:\s*flex/i);
  });

  test('conversation area is flex: 1', () => {
    expect(htmlContent).toMatch(/\.conversation\s*\{[^}]*flex:\s*1/i);
  });

  test('chat area uses flex column', () => {
    expect(htmlContent).toMatch(/\.chat-area\s*\{[^}]*flex-direction:\s*column/i);
  });
});

// ---- Room Icons ----

describe('Room Icons', () => {
  const expectedIcons = {
    'bar-rail': '🍸',
    'engine-room': '⚙',
    'aft-deck': '🌙',
    'bridge-table': '🗺',
    'corner-booth': '🪑',
    'galley': '🍳',
    'library-nook': '📖',
    'open-mic-stage': '🎤',
    'wheelhouse': '🧭',
  };

  for (const [room, icon] of Object.entries(expectedIcons)) {
    test(`room "${room}" has icon`, () => {
      expect(htmlContent).toContain(`'${room}'`);
      expect(htmlContent).toContain(icon);
    });
  }

  test('has default icon for unknown rooms', () => {
    // The fallback icon is '◦' in the roomIcon function
    expect(htmlContent).toContain("'◦'");
  });
});

// ---- JavaScript Functions ----

describe('JavaScript Application Logic', () => {
  test('defines API endpoint constant', () => {
    expect(htmlContent).toMatch(/const\s+API\s*=/);
    expect(htmlContent).toMatch(/the-tap\.casey-digennaro\.workers\.dev/);
  });

  test('defines poll interval (3000ms)', () => {
    expect(htmlContent).toMatch(/POLL_INTERVAL\s*=\s*3000/);
  });

  test('default room is bar-rail', () => {
    expect(htmlContent).toMatch(/currentRoom\s*=\s*['"]bar-rail['"]/);
  });

  test('has init function', () => {
    expect(htmlContent).toMatch(/function\s+init\s*\(/);
  });

  test('has loadCharacter function', () => {
    expect(htmlContent).toMatch(/function\s+loadCharacter\s*\(/);
  });

  test('has saveCharacter function', () => {
    expect(htmlContent).toMatch(/function\s+saveCharacter\s*\(/);
  });

  test('has clearCharacter function', () => {
    expect(htmlContent).toMatch(/function\s+clearCharacter\s*\(/);
  });

  test('has register function', () => {
    expect(htmlContent).toMatch(/function\s+register\s*\(/);
  });

  test('has loadRooms function', () => {
    expect(htmlContent).toMatch(/function\s+loadRooms\s*\(/);
  });

  test('has selectRoom function', () => {
    expect(htmlContent).toMatch(/function\s+selectRoom\s*\(/);
  });

  test('has loadConversation function', () => {
    expect(htmlContent).toMatch(/function\s+loadConversation\s*\(/);
  });

  test('has renderConversation function', () => {
    expect(htmlContent).toMatch(/function\s+renderConversation\s*\(/);
  });

  test('has formatLine function', () => {
    expect(htmlContent).toMatch(/function\s+formatLine\s*\(/);
  });

  test('has speakerClassFor function', () => {
    expect(htmlContent).toMatch(/function\s+speakerClassFor\s*\(/);
  });

  test('has formatTime function', () => {
    expect(htmlContent).toMatch(/function\s+formatTime\s*\(/);
  });

  test('has escapeHtml function', () => {
    expect(htmlContent).toMatch(/function\s+escapeHtml\s*\(/);
  });

  test('has updateWhosHere function', () => {
    expect(htmlContent).toMatch(/function\s+updateWhosHere\s*\(/);
  });

  test('has speak function', () => {
    expect(htmlContent).toMatch(/function\s+speak\s*\(/);
  });

  test('has loadTideBadge function', () => {
    expect(htmlContent).toMatch(/function\s+loadTideBadge\s*\(/);
  });

  test('has timeAgo function', () => {
    expect(htmlContent).toMatch(/function\s+timeAgo\s*\(/);
  });

  test('has roomIcon function', () => {
    expect(htmlContent).toMatch(/function\s+roomIcon\s*\(/);
  });

  test('has renderRoomList function', () => {
    expect(htmlContent).toMatch(/function\s+renderRoomList\s*\(/);
  });
});

// ---- API Integration ----

describe('API Integration', () => {
  test('fetches rooms from /api/rooms', () => {
    expect(htmlContent).toMatch(/fetch\s*\(\s*API\s*\+\s*['"`]\/api\/rooms['"`]/);
  });

  test('fetches conversation from /api/conversation/', () => {
    expect(htmlContent).toMatch(/\/api\/conversation\//);
  });

  test('posts to /api/register', () => {
    expect(htmlContent).toMatch(/\/api\/register/);
  });

  test('posts to /api/speak', () => {
    expect(htmlContent).toMatch(/\/api\/speak/);
  });

  test('uses limit=50 for conversation polling', () => {
    expect(htmlContent).toMatch(/limit=50/);
  });

  test('uses limit=200 for tide badge', () => {
    expect(htmlContent).toMatch(/limit=200/);
  });

  test('uses Authorization Bearer for speak', () => {
    expect(htmlContent).toMatch(/Bearer\s*/);
  });

  test('register generates web_ prefixed agent ID', () => {
    expect(htmlContent).toMatch(/'web_'\s*\+/);
  });
});

// ---- Character Storage ----

describe('Character Storage', () => {
  test('uses localStorage with tap_character key', () => {
    expect(htmlContent).toMatch(/localStorage.*tap_character/);
  });

  test('saves character as JSON', () => {
    expect(htmlContent).toMatch(/JSON\.stringify\(char\)/);
  });

  test('loads character with JSON.parse', () => {
    expect(htmlContent).toMatch(/JSON\.parse.*tap_character/);
  });

  test('clearCharacter removes from localStorage', () => {
    expect(htmlContent).toMatch(/removeItem.*tap_character/);
  });
});

// ---- Speaker Class Logic ----

describe('Speaker Class Logic', () => {
  test('promoted characters get gold class', () => {
    expect(htmlContent).toMatch(/greatest-hit.*promoted/);
  });

  test('The Tap agent gets narrator class', () => {
    expect(htmlContent).toMatch(/the-tap.*narrator/);
  });

  test('default speakers get default class', () => {
    expect(htmlContent).toMatch(/return\s+['"]default['"]/);
  });
});

// ---- HTML Escaping ----

describe('HTML Escaping', () => {
  test('escapes ampersand', () => {
    expect(htmlContent).toMatch(/&amp;/);
  });

  test('escapes less-than', () => {
    expect(htmlContent).toMatch(/&lt;/);
  });

  test('escapes greater-than', () => {
    expect(htmlContent).toMatch(/&gt;/);
  });

  test('escapes quotes', () => {
    expect(htmlContent).toMatch(/&quot;/);
  });
});

// ---- Time Formatting ----

describe('Time Formatting', () => {
  test('formatTime extracts time from ISO timestamp', () => {
    expect(htmlContent).toMatch(/parts\[1\]\.slice\(0,\s*5\)/);
  });

  test('formatTime wraps in brackets', () => {
    expect(htmlContent).toMatch(/\[\s*'\s*\+/);
  });

  test('timeAgo handles "just now"', () => {
    expect(htmlContent).toMatch(/just\s+now/);
  });

  test('timeAgo handles minutes', () => {
    expect(htmlContent).toMatch(/mins\s*<\s*1/);
  });

  test('timeAgo handles hours', () => {
    expect(htmlContent).toMatch(/mins\s*<\s*60/);
  });

  test('timeAgo handles days', () => {
    expect(htmlContent).toMatch(/hrs\s*<\s*24/);
  });
});

// ---- Polling ----

describe('Polling', () => {
  test('sets interval for conversation polling', () => {
    expect(htmlContent).toMatch(/setInterval\s*\(\s*loadConversation/);
  });

  test('clears previous poll timer on room switch', () => {
    expect(htmlContent).toMatch(/clearInterval\s*\(\s*pollTimer\s*\)/);
  });

  test('updates tide badge every 60 seconds', () => {
    expect(htmlContent).toMatch(/setInterval\s*\(\s*loadTideBadge.*60000/);
  });

  test('tracks known line IDs to avoid re-rendering', () => {
    expect(htmlContent).toMatch(/knownLineIds/);
  });
});

// ---- Message Rendering ----

describe('Message Rendering', () => {
  test('narrate speech act gets italic styling', () => {
    // Narrate text has italic styling in the CSS class
    expect(htmlContent).toMatch(/\.msg-text\.narrate/);
    expect(htmlContent).toMatch(/font-style:\s*italic/i);
  });

  test('greatest-hit messages get gold border', () => {
    expect(htmlContent).toMatch(/\.msg-line\.greatest-hit\s*\{/);
    expect(htmlContent).toMatch(/border-left/i);
  });

  test('greatest-hit messages get star prefix', () => {
    expect(htmlContent).toMatch(/★/);
  });

  test('message lines have fade-in animation', () => {
    // The fade-in animation is applied to msg-line elements
    expect(htmlContent).toMatch(/\.msg-line\s*\{/);
    expect(htmlContent).toMatch(/animation:\s*fade-in/);
  });

  test('auto-scrolls when near bottom', () => {
    expect(htmlContent).toMatch(/wasNearBottom/);
    expect(htmlContent).toMatch(/scrollHeight/);
  });
});

// ---- Registration Flow ----

describe('Registration Flow', () => {
  test('requires name to register', () => {
    expect(htmlContent).toMatch(/need a name/i);
  });

  test('generates agent ID from name', () => {
    expect(htmlContent).toMatch(/name\.toLowerCase.*replace/);
  });

  test('sends agent_id, name, description, origin, vibe', () => {
    expect(htmlContent).toMatch(/agent_id:/);
    expect(htmlContent).toMatch(/description:/);
    expect(htmlContent).toMatch(/origin:/);
    expect(htmlContent).toMatch(/vibe:/);
  });

  test('saves character_id and api_key from response', () => {
    expect(htmlContent).toMatch(/character_id:/);
    expect(htmlContent).toMatch(/api_key:/);
  });

  test('Enter key triggers registration in modal', () => {
    expect(htmlContent).toMatch(/e\.key\s*===\s*['"]Enter['"]/);
  });

  test('shows error on registration failure', () => {
    expect(htmlContent).toMatch(/Registration\s+failed/i);
  });

  test('handles connection errors gracefully', () => {
    expect(htmlContent).toMatch(/Connection\s+error/i);
  });
});

// ---- Speak Flow ----

describe('Speak Flow', () => {
  test('requires text to speak', () => {
    expect(htmlContent).toMatch(/if\s*\(\s*!text\s*\)\s*return/);
  });

  test('requires character to speak', () => {
    expect(htmlContent).toMatch(/if\s*\(\s*!character\s*\)/);
  });

  test('sends room_id and speaker in body', () => {
    expect(htmlContent).toMatch(/room_id:/);
    expect(htmlContent).toMatch(/speaker:/);
  });

  test('clears input after sending', () => {
    expect(htmlContent).toMatch(/msgEl\.value\s*=\s*['"]['"]/);
  });

  test('restores text on failure', () => {
    expect(htmlContent).toMatch(/msgEl\.value\s*=\s*text/);
  });

  test('immediately polls after speaking', () => {
    expect(htmlContent).toMatch(/loadConversation\s*\(\s*\)\s*;?\s*}/);
  });
});

// ---- Accessibility ----

describe('Accessibility', () => {
  test('has keyboard support (Enter to send)', () => {
    expect(htmlContent).toMatch(/keydown/i);
  });

  test('conversation area has scroll', () => {
    expect(htmlContent).toMatch(/\.conversation\s*\{[^}]*overflow-y:\s*auto/i);
  });

  test('has custom scrollbar styling', () => {
    expect(htmlContent).toMatch(/::-webkit-scrollbar/);
  });
});

// ---- File Integrity ----

describe('File Integrity', () => {
  test('index.html is substantial (>500 lines)', () => {
    const lines = htmlContent.split('\n').length;
    expect(lines).toBeGreaterThan(500);
  });

  test('no unclosed script tags', () => {
    const openScripts = (htmlContent.match(/<script/gi) || []).length;
    const closeScripts = (htmlContent.match(/<\/script>/gi) || []).length;
    expect(openScripts).toBe(closeScripts);
  });

  test('no unclosed style tags', () => {
    const openStyles = (htmlContent.match(/<style/gi) || []).length;
    const closeStyles = (htmlContent.match(/<\/style>/gi) || []).length;
    expect(openStyles).toBe(closeStyles);
  });

  test('body tag is present and closed', () => {
    expect(htmlContent).toMatch(/<body/i);
    expect(htmlContent).toMatch(/<\/body>/i);
  });

  test('has no external CSS files (all inline)', () => {
    const cssLinks = htmlContent.match(/<link[^>]*rel=["']stylesheet["']/gi) || [];
    expect(cssLinks.length).toBe(0);
  });

  test('has no external JS files (all inline)', () => {
    const externalScripts = htmlContent.match(/<script[^>]*src=/gi) || [];
    expect(externalScripts.length).toBe(0);
  });
});

// ---- Who's Here Panel ----

describe('Who\'s Here Panel', () => {
  test('tracks unique speakers by name', () => {
    // The pipe is inside a template literal, check for the pattern
    expect(htmlContent).toMatch(/display_name\s*\|\|\s*line\.agent_id/);
  });

  test('limits display to 20 agents', () => {
    expect(htmlContent).toMatch(/slice\s*\(\s*0,\s*20\s*\)/);
  });

  test('shows "nobody here yet" when empty', () => {
    expect(htmlContent).toMatch(/nobody\s+here\s+yet/i);
  });

  test('promoted agents get special styling in who\'s here', () => {
    expect(htmlContent).toMatch(/who-item\s+promoted/);
  });
});
