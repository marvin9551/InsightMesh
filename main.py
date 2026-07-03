"""Run the FastAPI server via uvicorn."""

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
"""Run the FastAPI server via uvicorn."""

import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
def main():
    print("Hello from backend!")


if __name__ == "__main__":
    main()
