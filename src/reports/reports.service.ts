import { BadRequestException, Injectable } from '@nestjs/common';
import { Paragraph, Packer, Document, AlignmentType, TextRun, Table, TableCell, TableRow, WidthType } from 'docx';
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
    const pageMargin = 50;
    const lineHeight = 20;
    const titleFontSize = 20;
    const contentFontSize = 14;
    const contentIndent = 50;

    let page = pdfDoc.addPage();
    const { height } = page.getSize();
    let yPosition = height - pageMargin;

    page.drawText('Favorite Movies Report', {
      x: contentIndent,
      y: yPosition,
      size: titleFontSize,
      color: rgb(0, 0, 0),
    });

    yPosition -= 2 * lineHeight;

    movies.forEach((movie) => {
      if (yPosition < pageMargin + lineHeight * 4) {
        page = pdfDoc.addPage();
        yPosition = height - pageMargin;
        yPosition -= 2 * lineHeight;
      }

      page.drawText(`Title: ${movie.title}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      page.drawText(`Genre: ${movie.genre}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize - 2,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      page.drawText(`Release Date: ${movie.creationDate}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize - 2,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      page.drawText(`Budget: ${movie.budget}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize - 2,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight * 2;
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

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Title', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Genre', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Release Date', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Budget', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
          ],
        }),
        ...movies.map((movie) =>
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: movie.title, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: movie.genre, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: movie.creationDate, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: `${movie.budget.toString()}$`, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
            ],
          }),
        ),
      ],
    });

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
                  size: 40,
                  color: '000000',
                  font: 'Helvetica',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            table,
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

  async generateFavoritesActorsPdf(userId: number, res: Response) {
    const actors = await this.userService.getFavoritesActors(userId);

    if (!actors || actors.length === 0) {
      throw new BadRequestException('No favorite actors found');
    }

    const pdfDoc = await PDFDocument.create();
    const pageMargin = 50;
    const lineHeight = 20;
    const titleFontSize = 20;
    const contentFontSize = 14;
    const contentIndent = 50;

    let page = pdfDoc.addPage();
    const { height } = page.getSize();
    let yPosition = height - pageMargin;

    page.drawText('Favorite Actors Report', {
      x: contentIndent,
      y: yPosition,
      size: titleFontSize,
      color: rgb(0, 0, 0),
    });

    yPosition -= 2 * lineHeight;

    actors.forEach((actor) => {
      if (yPosition < pageMargin + lineHeight * 4) {
        page = pdfDoc.addPage();
        yPosition = height - pageMargin;
        yPosition -= 2 * lineHeight;
      }

      page.drawText(`Name: ${actor.name} ${actor.surname}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      page.drawText(`Birthday: ${actor.birthday}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize - 2,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      page.drawText(`Place of Birth: ${actor.placeOfBirth}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize - 2,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight * 2;
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=favorites_actors.pdf',
    );
    res.send(Buffer.from(pdfBytes));
  }

  async generateFavoritesActorsDocx(userId: number, res: Response) {
    const actors = await this.userService.getFavoritesActors(userId);

    if (!actors || actors.length === 0) {
      throw new BadRequestException('No favorite actors found');
    }

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Name', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Birthday', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Place of Birth', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
          ],
        }),
        ...actors.map((actor) =>
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: `${actor.name} ${actor.surname}`, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: actor.birthday, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: actor.placeOfBirth, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
            ],
          })
        ),
      ],
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Favorite Actors Report',
                  bold: true,
                  size: 40,
                  color: '000000',
                  font: 'Helvetica',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            table,
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=favorites_actors.docx',
    );
    res.send(buffer);
  }

  async generateFavoritesDirectorsPdf(userId: number, res: Response) {
    const directors = await this.userService.getFavoritesDirectors(userId);

    if (!directors || directors.length === 0) {
      throw new BadRequestException('No favorite directors found');
    }

    const pdfDoc = await PDFDocument.create();
    const pageMargin = 50;
    const lineHeight = 20;
    const titleFontSize = 20;
    const contentFontSize = 14;
    const contentIndent = 50;

    let page = pdfDoc.addPage();
    const { height } = page.getSize();
    let yPosition = height - pageMargin;

    page.drawText('Favorite Directors Report', {
      x: contentIndent,
      y: yPosition,
      size: titleFontSize,
      color: rgb(0, 0, 0),
    });

    yPosition -= 2 * lineHeight;

    directors.forEach((director) => {
      if (yPosition < pageMargin + lineHeight * 4) {
        page = pdfDoc.addPage();
        yPosition = height - pageMargin;
        yPosition -= 2 * lineHeight;
      }

      page.drawText(`Name: ${director.name} ${director.surname}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      page.drawText(`Birthday: ${director.birthday}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize - 2,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      page.drawText(`Place of Birth: ${director.placeOfBirth}`, {
        x: contentIndent,
        y: yPosition,
        size: contentFontSize - 2,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight * 2;
    });

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=favorites_directors.pdf',
    );
    res.send(Buffer.from(pdfBytes));
  }

  async generateFavoritesDirectorsDocx(userId: number, res: Response) {
    const directors = await this.userService.getFavoritesDirectors(userId);

    if (!directors || directors.length === 0) {
      throw new BadRequestException('No favorite directors found');
    }

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Name', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Birthday', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [new Paragraph({
                children: [new TextRun({ text: 'Place of Birth', bold: true, size: 34 })],
                alignment: AlignmentType.CENTER,
              })],
              margins: { top: 200, bottom: 200 },
            }),
          ],
        }),
        ...directors.map((director) =>
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: `${director.name} ${director.surname}`, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: director.birthday, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: director.placeOfBirth, size: 28 })],
                  alignment: AlignmentType.CENTER,
                })],
                margins: { top: 200, bottom: 200 },
              }),
            ],
          })
        ),
      ],
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Favorite Directors Report',
                  bold: true,
                  size: 40,
                  color: '000000',
                  font: 'Helvetica',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            table,
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=favorites_directors.docx',
    );
    res.send(buffer);
  }
}
