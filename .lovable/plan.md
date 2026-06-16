# Plan to update the "Solution Pro" section image

We will replace the image in the `SolutionProSection` (`src/assets/solution-pro-hero.webp`) with a new, high-quality, professional image generated based on the reference you uploaded, ensuring that the person holding the device is more visible in the frame.

## Technical steps
1. **Generate Image**: Use the agent-side image generator to create a cinematic, photo-realistic image representing:
   - An African field manager or waste pre-collection agent in Togo (Lomé) wearing a green professional polo/work shirt.
   - The agent is seen in a medium close-up shot (showing more of their upper body and side profile/face clearly) holding a modern tablet/smartphone displaying a GPS mapping application with waste collection routes (truck routes, highlighted streets on a map).
   - Clean, realistic setting (golden hour sunlight, realistic West African street context).
   - Clear focus on both the interactive tablet screen and the professional agent's face/profile.
2. **Compress / Optimize**: Convert the generated image to `.webp` format and save it directly over `src/assets/solution-pro-hero.webp` to keep the codebase clean and automatically update the component references.
3. **Verify**: Test the preview to make sure the image fits perfectly and renders beautifully inside the glass/premium layout.