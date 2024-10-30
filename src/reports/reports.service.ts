import { BadRequestException, Injectable } from '@nestjs/common';
import { Paragraph, Packer, Document } from 'docx';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable()
export class ReportsService {
  constructor(private userService: UserService) {}

  async generateFavoritesMoviesPdf(userId: number, res: Response) {
    const movies = await this.userService.getFavoritesMovies(userId);

    if (!movies || movies.length === 0) {
      throw new BadRequestException('No favorite movies found');
    }

    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage();
    const { height } = page.getSize();

    page.drawText('Favorite Movies Report', {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0),
    });

    let yPosition = height - 80;

    movies.forEach((movie) => {
      page.drawText(`Title: ${movie.title}`, {
        x: 50,
        y: yPosition,
        size: 14,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;

      page.drawText(`Genre: ${movie.genre}`, {
        x: 50,
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;

      page.drawText(`Release Date: ${movie.creationDate}`, {
        x: 50,
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });
      yPosition -= 20;

      page.drawText(`Budget: ${movie.budget}`, {
        x: 50,
        y: yPosition,
        size: 12,
        color: rgb(0, 0, 0),
      });
      yPosition -= 40;
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=favorites.pdf');
    res.send(Buffer.from(pdfBytes));
  }

  async generateFavoritesMoviesDocx(userId: number, res: Response) {
    const movies = await this.userService.getFavoritesMovies(userId);

    if (!movies || movies.length === 0) {
      throw new BadRequestException('No favorite movies found');
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: 'Favorite Movies Report',
              heading: 'Heading1',
            }),
            ...movies.map(
              (movie) =>
                new Paragraph({
                  text: `Title: ${movie.title}\nGenre: ${movie.genre}\nRelease Date: ${movie.creationDate}\nBudget: ${movie.budget}\n`,
                }),
            ),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=favorites.docx');

    res.send(buffer);
  }
}
