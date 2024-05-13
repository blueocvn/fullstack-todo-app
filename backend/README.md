# Todo Backend

## Setup

Python env: `Python 3.10`

> Recommended tool [pyenv](https://github.com/pyenv/pyenv)

```bash
# Install python version
pyenv install $(cat .python-version)

# Activate python version
pyenv local $(cat .python-version)
```

### Poetry

> Learn basic usage at [poetry docs](https://python-poetry.org/docs/basic-usage/)

```bash
python -m venv .venv
```

Using `pip` to install poetry

```sh
pip install poetry
```

Install project dependencies with poetry

```bash
poetry install
```

Active environment

```bash
poetry shell
```

### Pre-commit

Config pre-commit

```sh
pre-commit install
```

Formatter All File (Manual):

```sh
pre-commit run --all-files
```

### Migration

Generate `alembic` migration script

```sh
alembic revision --autogenerate -m "migration message"
```

## Start the app

To start the development server run

```sh
uvicorn app.main:app --reload
```

Open your browser and navigate to http://localhost:8000/.
