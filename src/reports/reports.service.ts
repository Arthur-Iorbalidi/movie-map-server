import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Paragraph,
  Packer,
  Document,
  AlignmentType,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from 'docx';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import PDFDocument from 'pdfkit';

@Injectable()
export class ReportsService {
  constructor(private userService: UserService) {}

  async generateFavoritesMoviesPdf(userId, res) {
    const movies = await this.userService.getFavoritesMovies(userId);

    if (!movies || movies.length === 0) {
      throw new BadRequestException('No favorite movies found');
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=favorites.pdf');
    doc.pipe(res);

    doc
      .fontSize(20)
      .text('Favorite Movies Report', { align: 'center', underline: true });
    doc.moveDown();

    const tableTop = 100;
    const columnWidths = [200, 100, 100, 100];

    let yPosition = tableTop;

    const headers = ['Title', 'Genre', 'Release Date', 'Budget'];
    doc.fontSize(12).font('Helvetica-Bold');
    doc
      .rect(
        50,
        yPosition - 10,
        columnWidths.reduce((a, b) => a + b, 0),
        20,
      )
      .fill('#f0f0f0')
      .stroke();
    headers.forEach((header, i) => {
      doc
        .fillColor('#000000')
        .text(
          header,
          50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
          yPosition,
          {
            width: columnWidths[i],
            align: 'left',
          },
        );
    });

    yPosition += 30;
    doc
      .moveTo(50, yPosition)
      .lineTo(50 + columnWidths.reduce((a, b) => a + b, 0), yPosition)
      .stroke();

    doc.font('Helvetica').fontSize(10);
    let isEvenRow = false;

    movies.forEach((movie) => {
      if (yPosition + 30 > doc.page.height - 50) {
        doc.addPage();
        yPosition = tableTop;
        isEvenRow = false;
      }

      const rowColor = isEvenRow ? '#f9f9f9' : '#ffffff';
      const rowHeights = [
        movie.title,
        movie.genre,
        movie.creationDate,
        movie.budget,
      ].map((text, i) => {
        return doc.heightOfString(text, {
          width: columnWidths[i],
          align: 'left',
        });
      });

      const maxRowHeight = Math.max(...rowHeights) + 10;

      doc
        .rect(
          50,
          yPosition - 10,
          columnWidths.reduce((a, b) => a + b, 0),
          maxRowHeight,
        )
        .fill(rowColor)
        .stroke();

      const row = [
        movie.title,
        movie.genre,
        movie.creationDate,
        `${movie.budget}$`,
      ];
      row.forEach((cell, i) => {
        doc
          .fillColor('#000000')
          .text(
            cell,
            50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
            yPosition,
            {
              width: columnWidths[i],
              align: 'left',
              lineBreak: true,
            },
          );
      });
      yPosition += maxRowHeight;
      isEvenRow = !isEvenRow;
    });

    doc.end();
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
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Title', bold: true, size: 34 }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Genre', bold: true, size: 34 }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Release Date', bold: true, size: 34 }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Budget', bold: true, size: 34 }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
          ],
        }),
        ...movies.map(
          (movie) =>
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: movie.title, size: 28 })],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  margins: { top: 200, bottom: 200 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: movie.genre, size: 28 })],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  margins: { top: 200, bottom: 200 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: movie.creationDate, size: 28 }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  margins: { top: 200, bottom: 200 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${movie.budget.toString()}$`,
                          size: 28,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
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

  async generateFavoritesActorsPdf(userId, res) {
    const actors = await this.userService.getFavoritesActors(userId);

    if (!actors || actors.length === 0) {
      throw new BadRequestException('No favorite actors found');
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=favorites_actors.pdf',
    );
    doc.pipe(res);

    doc
      .fontSize(20)
      .text('Favorite Actors Report', { align: 'center', underline: true });
    doc.moveDown();

    const tableTop = 100;
    const columnWidths = [200, 150, 150];

    let yPosition = tableTop;

    const headers = ['Name', 'Birthday', 'Place of Birth'];
    doc.fontSize(12).font('Helvetica-Bold');
    doc
      .rect(
        50,
        yPosition - 10,
        columnWidths.reduce((a, b) => a + b, 0),
        20,
      )
      .fill('#f0f0f0')
      .stroke();
    headers.forEach((header, i) => {
      doc
        .fillColor('#000000')
        .text(
          header,
          50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
          yPosition,
          {
            width: columnWidths[i],
            align: 'left',
          },
        );
    });

    yPosition += 30;
    doc
      .moveTo(50, yPosition)
      .lineTo(50 + columnWidths.reduce((a, b) => a + b, 0), yPosition)
      .stroke();

    doc.font('Helvetica').fontSize(10);
    let isEvenRow = false;

    actors.forEach((actor) => {
      if (yPosition + 30 > doc.page.height - 50) {
        doc.addPage();
        yPosition = tableTop;
        isEvenRow = false;
      }

      const rowColor = isEvenRow ? '#f9f9f9' : '#ffffff';
      const rowHeights = [
        `${actor.name} ${actor.surname}`,
        actor.birthday,
        actor.placeOfBirth,
      ].map((text, i) => {
        return doc.heightOfString(text, {
          width: columnWidths[i],
          align: 'left',
        });
      });

      const maxRowHeight = Math.max(...rowHeights) + 10;

      doc
        .rect(
          50,
          yPosition - 10,
          columnWidths.reduce((a, b) => a + b, 0),
          maxRowHeight,
        )
        .fill(rowColor)
        .stroke();

      const row = [
        `${actor.name} ${actor.surname}`,
        actor.birthday,
        actor.placeOfBirth,
      ];
      row.forEach((cell, i) => {
        doc
          .fillColor('#000000')
          .text(
            cell,
            50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
            yPosition,
            {
              width: columnWidths[i],
              align: 'left',
              lineBreak: true,
            },
          );
      });
      yPosition += maxRowHeight;
      isEvenRow = !isEvenRow;
    });

    doc.end();
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
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Name', bold: true, size: 34 }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Birthday', bold: true, size: 34 }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Place of Birth',
                      bold: true,
                      size: 34,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
          ],
        }),
        ...actors.map(
          (actor) =>
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${actor.name} ${actor.surname}`,
                          size: 28,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  margins: { top: 200, bottom: 200 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: actor.birthday, size: 28 }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  margins: { top: 200, bottom: 200 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: actor.placeOfBirth, size: 28 }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
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

  async generateFavoritesDirectorsPdf(userId, res) {
    const directors = await this.userService.getFavoritesDirectors(userId);

    if (!directors || directors.length === 0) {
      throw new BadRequestException('No favorite directors found');
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=favorites_directors.pdf',
    );
    doc.pipe(res);

    doc
      .fontSize(20)
      .text('Favorite Directors Report', { align: 'center', underline: true });
    doc.moveDown();

    const tableTop = 100;
    const columnWidths = [200, 150, 150];

    let yPosition = tableTop;

    const headers = ['Name', 'Birthday', 'Place of Birth'];
    doc.fontSize(12).font('Helvetica-Bold');
    doc
      .rect(
        50,
        yPosition - 10,
        columnWidths.reduce((a, b) => a + b, 0),
        20,
      )
      .fill('#f0f0f0')
      .stroke();
    headers.forEach((header, i) => {
      doc
        .fillColor('#000000')
        .text(
          header,
          50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
          yPosition,
          {
            width: columnWidths[i],
            align: 'left',
          },
        );
    });

    yPosition += 30;
    doc
      .moveTo(50, yPosition)
      .lineTo(50 + columnWidths.reduce((a, b) => a + b, 0), yPosition)
      .stroke();

    doc.font('Helvetica').fontSize(10);
    let isEvenRow = false;

    directors.forEach((director) => {
      if (yPosition + 30 > doc.page.height - 50) {
        doc.addPage();
        yPosition = tableTop;
        isEvenRow = false;
      }

      const rowColor = isEvenRow ? '#f9f9f9' : '#ffffff';
      const rowHeights = [
        `${director.name} ${director.surname}`,
        director.birthday,
        director.placeOfBirth,
      ].map((text, i) => {
        return doc.heightOfString(text, {
          width: columnWidths[i],
          align: 'left',
        });
      });

      const maxRowHeight = Math.max(...rowHeights) + 10;

      doc
        .rect(
          50,
          yPosition - 10,
          columnWidths.reduce((a, b) => a + b, 0),
          maxRowHeight,
        )
        .fill(rowColor)
        .stroke();

      const row = [
        `${director.name} ${director.surname}`,
        director.birthday,
        director.placeOfBirth,
      ];
      row.forEach((cell, i) => {
        doc
          .fillColor('#000000')
          .text(
            cell,
            50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
            yPosition,
            {
              width: columnWidths[i],
              align: 'left',
              lineBreak: true,
            },
          );
      });
      yPosition += maxRowHeight;
      isEvenRow = !isEvenRow;
    });

    doc.end();
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
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Name', bold: true, size: 34 }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Birthday', bold: true, size: 34 }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Place of Birth',
                      bold: true,
                      size: 34,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              margins: { top: 200, bottom: 200 },
            }),
          ],
        }),
        ...directors.map(
          (director) =>
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${director.name} ${director.surname}`,
                          size: 28,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  margins: { top: 200, bottom: 200 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: director.birthday, size: 28 }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  margins: { top: 200, bottom: 200 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: director.placeOfBirth, size: 28 }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
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
