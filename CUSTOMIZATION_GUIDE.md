# Portfolio Navigator Customization Guide


## Tips for color and UI:

You can easily implement backgrounds from https://patterncraft.fun/

Want a glass texture for your chat? https://glass3d.dev/

Amazing resources for animations, backgrounds, and more: https://www.cult-ui.com/
https://reactbits.dev/
https://www.kibo-ui.com/
https://21st.dev/home


Specifically for chat interfaces: https://www.prompt-kit.com/


## Quick Updates

### 1. Update "More About Me" Link
**File:** `src/components/chat/ChatInterface.tsx`
**Line:** ~798-805

Replace the placeholder code with your actual portfolio/website URL:
```tsx
<Link href="#" className="more-about-link" onClick={(e) => {
  e.preventDefault();
  // TODO: Replace with your actual portfolio URL
  // Example: window.open('https://yourportfolio.com', '_blank');
  console.log('Add your portfolio link here');
}}>
```

**To customize:**
1. Replace the `console.log` line with: `window.open('YOUR_URL_HERE', '_blank');`
2. Or change `href="#"` to `href="YOUR_URL_HERE"` and remove the onClick handler

**Examples:**
- `window.open('https://yourname.com', '_blank');`
- `window.open('https://yourname.github.io', '_blank');`
- `window.open('https://linkedin.com/in/yourprofile', '_blank');`

### 2. Customize Your Portfolio Data
**Files to update:**
- `src/data/portfolio-knowledge.ts` - Your projects, experience, skills
- `src/data/assistant-config.ts` - AI personality and conversation flow

**Reference:** `src/data/sample-portfolio-knowledge.ts` for examples

### 3. Replace Avatar (Already Updated)
✅ Generic user icon is now being used instead of PNG
- Uses Lucide React User icon
- Gray background with icon
- Fully responsive

### 4. Update Resume File
**File:** `public/assets/my-resume.pdf`
- Replace with your actual resume PDF
- Update the filename in `src/data/assistant-config.ts` if needed

## Next Steps

1. **Replace the placeholder link** in the "More about me" button
2. **Add your actual portfolio data** to the configuration files
3. **Upload your resume** to the public/assets folder
4. **Test the chat interface** to make sure responses reflect your information

## Need Help?

The chat interface will automatically detect when you've added real data vs placeholder content and adjust responses accordingly.
