<a href="https://www.blinkshot.io">
  <img alt="Blinkshot (Forked Version)" src="https://github.com/user-attachments/assets/07585ebd-5ad9-465f-8ad7-c106f1e8d43c">
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

- Updated theme
- Added download on hover button
- Added sample prompts
- Implemented controls for image resolution and generation steps

## Tech stack

- [Flux Schnell](https://www.dub.sh/together-flux/) from BFL for the image model
- [Together AI](https://www.dub.sh/together-ai) for inference
- Next.js app router with Tailwind
- Helicone for observability
- Plausible for website analytics

## Cloning & running

1. Clone this forked repo: `git clone https://github.com/kylburns89/blinkshot`
2. Create a `.env.local` file and add your [Together AI API key](https://www.dub.sh/together-ai): `TOGETHER_API_KEY=`
3. Run `npm install` and `npm run dev` to install dependencies and run locally

## Future Tasks

TBD

## Acknowledgements

This project is based on the original [BlinkShot](https://github.com/Nutlope/blinkshot) by [Nutlope](https://github.com/Nutlope). We are grateful for their work in creating the foundation for this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. This fork maintains the same license as the original project to comply with the terms of the original work.
