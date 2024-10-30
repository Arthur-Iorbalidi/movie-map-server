import { BadRequestException, Injectable } from '@nestjs/common';
import { Paragraph, Packer, Document, AlignmentType, TextRun } from 'docx';
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
              children: [
                new TextRun({
                  text: 'Favorite Movies Report',
                  bold: true,
                  size: 28,
                  color: '000000',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            ...movies.flatMap((movie) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Title: ${movie.title}`,
                    bold: true,
                    size: 24,
                    color: '2E75B6',
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Genre: ${movie.genre}`,
                    bold: true,
                    size: 20,
                    color: '1F4E78',
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Release Date: ${movie.creationDate}`,
                    size: 20,
                    color: '5B9BD5',
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Budget: ${movie.budget}`,
                    size: 20,
                    color: '5B9BD5',
                  }),
                ],
                spacing: { after: 300 },
              }),
            ]),
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
