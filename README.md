# M&S Web Engineering Coding Test

## Introduction

This test is designed for potential web engineers to demonstrate their frontend
coding skills. It's intended to be done in 45-90 minutes, over a week or so.

## Contents

The ZIP file you're given should contain:

- This file (`README.md`), which is the instructions for the test itself
- A data file (`data.json`), which contains some sample data you'll be using in
  the test

## Instructions

You'll receive this test as a ZIP file from whoever you contacted M&S via
(either an M&S recruiter or an external). You should return a ZIP file
containing your files (self-contained static files) to the same person when
you're finished.

### Timing

You should take about 45-90 minutes to complete a first pass at this work.

### Deliverable

Your task is to create a data grid using no external JavaScript frameworks or
libraries. The data for the grid is contained in the attached `data.json` file.

Please return, at a minimum, some HTML with inline CSS and JS. Feel free to
structure your files however you like, but it'll need to run standalone from a
file system with no web server or other supporting code.

We do not expect finished, polished code - if there's anything you leave out to
hit the timing, please just make a note of this somewhere as a future
improvement so we can see your thinking.

We're mainly interested in seeing how you approach this problem and how far
you'll get - if we like your code there'll be another opportunity to extend it
in an on-site pairing exercise.

### Specifics

The view should adapt to the range of sizes our designer has specified - large,
medium, and narrow - and have UX considerations for each of those sizes. See
below example of what it should look like.

#### Large screen

This is for screens greater than 768px.

```
+-------+-------+-------+
| Title | Price | Stars |
+-------+-------+-------+
```

#### Medium screen

This is for screens greater than 320px and equal to or smaller to 768px.

```
+-------+-------+
| Title | Price |
+-------+-------+
| Stars         |
+---------------+
```

#### Narrow screen

This is for screens 320px wide and smaller.


```
+-------+
| Title |
+-------+
| Price |
+-------+
| Stars |
+-------+
```

#### Features:

- Sorting by title and price (ASC/DESC)
- Filtering by title
- The last sorted field should persist when page is refreshed
- Highlight promoted items
