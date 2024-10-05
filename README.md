<a href="https://www.blinkshot.io">
  <img alt="Blinkshot (Forked Version)" src="./public/og-image.png">
  <h1 align="center">BlinkShot (Forked Version)</h1>
</a>

<p align="center">
  A forked version of the open source real-time AI image generator. Powered by Flux through Together.ai.
</p>

<p align="center">
  Original project by <a href="https://github.com/Nutlope">Nutlope</a>
</p>

## About this Fork

This is a forked version of the original BlinkShot project. The main changes in this fork include:

- Updated branding to clearly indicate it's a forked version
- Modified UI text to reflect the forked status
- Added attribution to the original creator in the footer
- Implemented controls for image resolution and generation steps

## Tech stack

- [Flux Schnell](https://www.dub.sh/together-flux/) from BFL for the image model
- [Together AI](https://www.dub.sh/together-ai) for inference
- Next.js app router with Tailwind
- Helicone for observability
- Plausible for website analytics

## Cloning & running

1. Clone this forked repo: `git clone https://github.com//blinkshot-fork`
2. Create a `.env.local` file and add your [Together AI API key](https://www.dub.sh/together-ai): `TOGETHER_API_KEY=`
3. Run `npm install` and `npm run dev` to install dependencies and run locally

## Differences from the Original

- The UI now clearly indicates that this is a forked version
- Attribution to the original creator is prominently displayed
- Users can now adjust the image resolution and number of generation steps
- A download button appears when hovering over the generated image

## Future Tasks

- [x] Update branding to indicate forked status
- [x] Add attribution to original creator
- [x] Let people play around with resolutions
- [x] Let people play around with steps
- [x] On hover, have a download button
- [ ] Add a CTA to fork the code on GitHub
- [ ] Add a description of the app to the footer
- [ ] Add themes

## Contributing

Contributions to this forked version are welcome. Please make sure to discuss any major changes via issues before submitting a pull request.

## Acknowledgements

This project is based on the original [BlinkShot](https://github.com/Nutlope/blinkshot) by [Nutlope](https://github.com/Nutlope). We are grateful for their work in creating the foundation for this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. This fork maintains the same license as the original project to comply with the terms of the original work.
